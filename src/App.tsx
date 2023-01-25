import React, { useState, useEffect } from "react";
import { execute } from "./utils/elo";
import { EloResult } from "./types";
import { toast } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ComOutage from "./components/modal/ComOutage";

function App() {
  const [result, setResult] = useState<EloResult | null>(null);

  const [modalShown, setModalShown] = useState<string | null>("comOutage");

  const calc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Calculating...", { id: "main" });

    const player1 = e.currentTarget.player1.value;
    const player2 = e.currentTarget.player2.value;
    const gameType = e.currentTarget.gameType.value;

    const result: EloResult = (await execute(
      player1,
      player2,
      gameType
    )) as EloResult;

    if (result.error) {
      toast.error(
        "An error occured.\nPlease make sure both usernames are correct.",
        {
          id: "main",
        }
      );
      return;
    } else {
      setResult(result);
      toast.success("Done", { id: "main" });
    }
  };

  return (
    <>
      {modalShown === "comOutage" && (
        <ComOutage setModalShown={setModalShown} />
      )}

      {/* form that has player 1 username, player 2 username, and then the type of game as a dropdown */}
      <div className="flex min-h-screen w-screen justify-center items-center text-white flex-col bg-[#312E2B] py-5">
        <Navbar />
        {/* style form with tailwind */}
        {!result ? (
          <form
            onSubmit={calc}
            className="flex flex-col w-full px-4 md:w-1/3 space-y-5 group"
          >
            <div className="flex flex-col items-center justify-center space-y-5">
              <h1 className="text-4xl font-bold">Elo Calculator</h1>
              <p className="text-lg">
                Calculate the rating change of two{" "}
                <a href="https://chess.com" className="text-greenprimary">
                  chess.com
                </a>{" "}
                players.
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="player1">Player 1</label>
              <input
                type="text"
                name="player1"
                id="player1"
                required
                className="inputField"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="player2">Player 2</label>
              <input
                type="text"
                name="player2"
                id="player2"
                required
                className="inputField"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gameType">Game Type</label>
              <select
                name="gameType"
                id="gameType"
                className="inputField"
                defaultValue="rapid"
              >
                <option value="bullet">Bullet</option>
                <option value="blitz">Blitz</option>
                <option value="rapid">Rapid</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#272522] border-b-4 border-[#1F1E1B] py-2 font-bold rounded-lg hover:bg-[#7FA650] hover:border-[#394a24] transition-colors duration-300"
            >
              Calculate
            </button>
          </form>
        ) : (
          <div className="">
            <div>
              <div className="flex flex-col md:flex-row">
                <PlayerCard
                  player={result.general?.player1.name as string}
                  rating={result.general?.player1.rating as number}
                  rd={result.general?.player1.rd as number}
                  result={
                    result.player1 as {
                      win: number;
                      loss: number;
                      draw: number;
                    }
                  }
                />
                <PlayerCard
                  player={result.general?.player2.name as string}
                  rating={result.general?.player2.rating as number}
                  rd={result.general?.player2.rd as number}
                  result={
                    result.player2 as {
                      win: number;
                      loss: number;
                      draw: number;
                    }
                  }
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="mb-5 bg-darkprimary px-4 py-2 rounded-lg text-lg font-bold border-b-4 border-darksecondary hover:border-greensecondary hover:bg-greenprimary transition-colors duration-500"
                  onClick={() => setResult(null)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="absolute bottom-0 flex justify-center items-center w-full h-20 bg-darkprimary text-white">
          <p className="text-lg">
            Made by Ted - Not affiliated with{" "}
            <span className="text-greenprimary">chess.com</span>
          </p>
        </footer>
      </div>
    </>
  );
}

const PlayerCard = ({
  player,
  rating,
  rd,
  result,
}: {
  player: string;
  rating: number;
  rd: number;
  result: {
    win: number;
    loss: number;
    draw: number;
  };
}) => {
  // api.chess.com/pub/player/username for image

  const [image, setImage] = useState<string | null>(
    "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
  );

  const fetchImage = async () => {
    const res = await fetch(`https://api.chess.com/pub/player/${player}`);
    const data = await res.json();
    return data.avatar
      ? data.avatar
      : "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg";
  };

  useEffect(() => {
    fetchImage().then((res) => setImage(res));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-2 p-10 bg-darkprimary m-10 rounded-lg border-b-8 border-darksecondary">
      <img
        src={image as string}
        alt="player"
        className="w-20 h-20 rounded-full"
      />

      <h1 className="text-2xl">{player}</h1>
      <h2 className="text-lg font-bold">
        Rating: <span className="text-greenprimary">{rating}</span>
      </h2>
      <h2>
        RD: <span className="text-greenprimary">{rd}</span>
      </h2>
      <br />
      <div className="flex flex-col space-y-5 text-center bg-darksecondary p-5 rounded-lg">
        <h2 className="text-lg font-bold text-center">Results</h2>
        <div className="flex space-x-10 items-center">
          <div className="">
            <h2 className="text-lg">Win </h2>
            <h2
              className={`${
                result.win > 0 ? "text-greenprimary" : "text-red-500"
              } font-bold text-lg`}
            >
              {result.win}
            </h2>
          </div>
          <div className="">
            <h2 className="text-lg">Loss </h2>
            <h2
              className={`${
                result.loss > 0 ? "text-greenprimary" : "text-red-500"
              } font-bold text-lg`}
            >
              {result.loss}
            </h2>
          </div>
          <div className="">
            <h2 className="text-lg">Draw</h2>
            <h2
              className={`${
                result.draw > 0 ? "text-greenprimary" : "text-red-500"
              } font-bold text-lg`}
            >
              {result.draw}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
