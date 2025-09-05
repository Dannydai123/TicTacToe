import { createContext, useReducer, useState } from "react";
import MovePrompt from "./MovePrompt.jsx";
import { WinningBoard } from "./ChessField";
import { createPortal } from 'react-dom';


export const ChessContext = createContext({});
export const ChessDispatchContext = createContext(null);

const initialChess = {
  chessArr: Array.from(Array(9), () => null),
  currentPlayerID: 0,
  player1Name: "Player1", //id=0
  player2Name: "Player2", //id=1
  movePrompt: [],
};

export function Provider({ children }) {
  // const [movePrompt, setMovePrompt] = useState(null);
  const [chessState, chessDispatch] = useReducer(chessReducer, initialChess);

  return (
    <ChessContext value={chessState}>
      <ChessDispatchContext value={chessDispatch}>
        <div className="flex justify-center items-center">
          <div className="h-[500px] w-[500px] bg-gray-800 flex flex-col py-6 px-6 gap-6">
            {children}
          </div>
        </div>

        {chessState.movePrompt.length ? <MovePrompt /> : null}



        {createPortal(<WinningBoard /> , document.body) }



      </ChessDispatchContext>
    </ChessContext>
  );
}

export function chessReducer(chess, action) {
  switch (action.type) {
    case "move": {

     const chessArr = chess.chessArr

      if (chess.currentPlayerID === 0) {

        chessArr[action.chessSquareId] = "O";

        chess.currentPlayerID = 1;
        chess.movePrompt.push(
          `${chess.player1Name} moves to  ${Math.floor(action.chessSquareId / 3) + 1} - ${(action.chessSquareId % 3) + 1}`,
        );
      } else {
        chessArr[action.chessSquareId] = "X";
        chess.currentPlayerID = 0;

        chess.movePrompt.push(
          `${chess.player2Name} moves to ${Math.floor(action.chessSquareId / 3) + 1} - ${(action.chessSquareId % 3) + 1}`,
        );
      }
      // console.log(chessArr)
      return {
        ...chess,
        movePrompt: chess.movePrompt.slice(-5),
        chessArr:[...chessArr],
      };
    }

    case "changePlayerName": {
      if (action.playerId === 0) chess.player1Name = action.playerName;
      else if (action.playerId === 1) chess.player2Name = action.playerName;
      return {
        ...chess,
      };
    }

    case "win": {
      return {
        ...chess,
      };
    }

    case "reset": {
      return {
        chessArr: Array.from(Array(9), () => null),
        currentPlayerID: 0,
        player1Name: chess.player1Name, //id=0
        player2Name: chess.player2Name, //id=1
        movePrompt: [],
      };
    }

    default:
      return chess;
  }
}
