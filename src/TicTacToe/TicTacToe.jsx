import { useState } from "react";

import "./tic-tac-toe.css";

import { Provider } from "./reducers.jsx";
import PlayerPanel from "./PlayerPanel.jsx";
import ChessField, { WinningBoard } from "./ChessField.jsx";

function App() {
  return (
    <div className={"min-h-svh11 bg-slate-300"}>
      <div className="my-12">
        <img
          src="/src/assets/tic-tac-toe.png"
          alt="tic-tae-toe title"
          className="h-[100px] mx-auto max-w-full object-fit-contain"
        />

        <div className="font-serif font-bold text-2xl mx-auto text-center my-2">
          Tic-Tac-Toe
        </div>
      </div>

      <Provider>
        <PlayerPanel />

        <ChessField />

        {/*<WinningBoard />*/}
      </Provider>
    </div>
  );
}

export default App;
