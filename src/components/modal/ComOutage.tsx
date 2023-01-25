import React from "react";

export default function ComOutage({
  setModalShown,
}: {
  setModalShown: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div className="z-10 fixed h-screen w-screen bg-black/75 flex items-center justify-center overflow-hidden">
      <div className="flex flex-col rounded-lg border-b-8 shadow-xl border-darksecondary items-center justify-between p-10 w-full h-1/2 md:w-1/2 bg-darkprimary text-white">
        <div>
          <img
            src="https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpGZ1eLb.png"
            alt="outage"
            className="w-20 h-20"
          />
        </div>
        <h1 className="text-2xl font-bold">
          Looks like chess.com made a blunder...
        </h1>
        <h2 className="">
          Chess.com is currently experiencing frequent server outages due to the
          increase in traffic, during this time the elo calculator may not be
          able to fetch your data.
        </h2>

        <button
          onClick={() => setModalShown(null)}
          className="bg-greenprimary border-b-4 border-greensecondary text-white rounded-lg p-2 w-1/2 font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
