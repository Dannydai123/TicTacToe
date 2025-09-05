import { ChessContext } from "./reducers.jsx";
import { useContext } from "react";

export default function MovePrompt() {
  const { movePrompt } = useContext(ChessContext);

  return (
    <div className="border-2 border-orange-400 bg-yellow-200 min-w-72 max-w-fit my-3 px-4 mx-auto">
      {movePrompt.map((elm, idx) => (
        <div key={idx} className="text-center"> {elm} </div>
      ))}
    </div>
  );
}
