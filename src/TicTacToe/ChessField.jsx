import { useContext, useEffect } from "react";
import { ChessContext, ChessDispatchContext } from "./reducers.jsx";

let isOver = false;
let  gameTie= false;

export default function ChessField() {
  const { chessArr } = useContext(ChessContext);

  const dispatch = useContext(ChessDispatchContext);

  const handleClick = (idx) => {
    if (!chessArr[idx])
      dispatch({
        type: "move",
        chessSquareId: idx,
      });
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      if (
        (chessArr[i * 3] === chessArr[1 + i * 3] &&
          chessArr[1 + i * 3] === chessArr[2 + i * 3] &&
          chessArr[i * 3] !== null) ||
        (chessArr[i] === chessArr[3 + i] &&
          chessArr[3 + i] === chessArr[6 + i] &&
          chessArr[i] !== null) ||
        (chessArr[0] === chessArr[4] &&
          chessArr[4] === chessArr[8] &&
          chessArr[8] !== null) ||
        (chessArr[2] === chessArr[4] &&
          (chessArr[4] === chessArr[6]) && (chessArr[6] !== null))
      ) {
        isOver = true;
        dispatch({
          type: "win",
        });
        return

      }
    }
    // console.log("in predicate1111")
    if (chessArr.every((elm) => elm)) {

      gameTie = true;
      dispatch({
        type: "win",
      });

    }

  }, [chessArr]);

  return (
    <div className="flex flex-wrap h-full my-6 mx-12 gap-4 justify-center">
      {chessArr.map((elm, idx) => (
        <div
          key={idx}
          className="w-1/4 h-1/4 bg-yellow-100 text-center font-bold text-4xl flex justify-center items-center"
          onClick={() => handleClick(idx)}
        >
          {elm}
        </div>
      ))}
    </div>
  );
}

export function WinningBoard() {
  const  chess = useContext(ChessContext);

  const dispatch = useContext(ChessDispatchContext);

  function handleResetBtn() {
    isOver = false;
    dispatch({
      type: "reset",
    });
  }

  return ( <>
      { (isOver || gameTie) &&

      <div className="absolute winningmodal">

        <div
            className=" text-center bg-amber-300 h-36   flex flex-col mx-auto justify-center items-center gap-4 shadow-amber-800 shadow-lg p-16 rounded-lg">

          {!gameTie && <div
              className="text-3xl text-bold">{chess.currentPlayerID ? chess.player2Name : chess.player1Name} WON!</div>}

          <button
              type="button"
              className="block bg-blue-400 rounded-xl hover:scale-105 text-xl p-2 shadow-xl shadow-amber-600"
              onClick={handleResetBtn}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
}
</>)

}
