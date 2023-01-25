
import axios from "axios";
// @ts-ignore
import * as g from "glicko2";

// If you are reading this and you are not me, you probably want to use the chess.com API instead of this. 
// This is just a fun project for me to learn about Glicko2. Also ignore the abundance of "any" types, I wrote this in javascript first and then converted it to typescript.

async function getUserStats(username: string) {
  const res = await axios.get(
    `https://api.chess.com/pub/player/${username}/stats`
  );
  return res.data;
}

async function getUserRating(username: string, gameType: string) {
  const stats = await getUserStats(username);

  try {

    const res = stats[`chess_${gameType}`].last;
    return res;
  } catch (err) {
    throw new Error("User not found.");
  }

}

async function gameChange(player1Stats: any, player2Stats: any, res: any) {
  const ranking = new g.Glicko2({
    tau: 0.5,
    rating: 1200,
    rd: 200,
    vol: 0.06,
  });

  const player1 = ranking.makePlayer(player1Stats.rating, player1Stats.rd);
  const player2 = ranking.makePlayer(player2Stats.rating, player2Stats.rd);

  const match = [player1, player2, res];

  ranking.updateRatings([match]);

  return {
    player1: player1.getRating() - player1Stats.rating,
    player2: player2.getRating() - player2Stats.rating,
  };
}

async function predictOutcome(player1Arg: any, player2Arg: any, gameType: any) {
  const player1Stats = await getUserRating(player1Arg, gameType);
  const player2Stats = await getUserRating(player2Arg, gameType);

//   console.log(
//     `Prediction starting for ${gameType} game.\nPlayer 1: ${player1Arg} - ELO: ${player1Stats.rating} - RD: ${player1Stats.rd}\nPlayer 2: ELO: ${player2Arg} - ${player2Stats.rating} - RD: ${player2Stats.rd}`
//   );

  const win = await gameChange(player1Stats, player2Stats, 1);
  const loss = await gameChange(player1Stats, player2Stats, 0);
  const draw = await gameChange(player1Stats, player2Stats, 0.5);

  const result = {
    player1: {
      win: Math.round(win.player1),
      loss: Math.round(loss.player1),
      draw: Math.round(draw.player1),
    },
    player2: {
      win: Math.round(loss.player2),
      loss: Math.round(win.player2),
      draw: Math.round(draw.player2),
    },
    general: {
      player1: {
        rating: player1Stats.rating,
        rd: player1Stats.rd,
        name: player1Arg,
      },
      player2: {
        rating: player2Stats.rating,
        rd: player2Stats.rd,
        name: player2Arg,
      },
      gameType: gameType,
    },
  };

  return result;
}

export async function execute(u1: string, u2: string, t: string) {
  try {

    const res = await predictOutcome(u1, u2, t);
    return res;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
