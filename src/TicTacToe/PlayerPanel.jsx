import { useContext, useState } from "react";
import { ChessContext, ChessDispatchContext } from "./reducers.jsx";
import clsx from "clsx";

export default function PlayerPanel() {
  const { player1Name, player2Name, currentPlayerID } =
    useContext(ChessContext);
  const dispatch = useContext(ChessDispatchContext);

  const [name1, setName1] = useState(player1Name);
  const [name2, setName2] = useState(player2Name);

  const handleSubmit = (formData) => {
    // console.log(player2Name, player1Name)
    if (
      formData.get("player1")?.trim() &&
      formData.get("player1")?.trim() !== player1Name
    ) {
      dispatch({
        type: "changePlayerName",
        playerId: 0,
        playerName: formData.get("player1").trim(),
      });
    } else if (
      formData.get("player2")?.trim() &&
      formData.get("player2")?.trim() !== player2Name
    ) {
      dispatch({
        type: "changePlayerName",
        playerId: 1,
        playerName: formData.get("player2").trim(),
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "player1" && e.target.value.trim())
      setName1(e.target.value);
    else if (e.target.name === "player2" && e.target.value.trim())
      setName2(e.target.value);
  };

  return (
    <div className="flex justify-around gap-1">
      <form action={handleSubmit} className="flex-1">
        <div
          className={clsx(
            currentPlayerID && "border-gray-500",
            "border  flex-1 h-[50px] font-sans font-bold text-white flex justify-around items-center",
          )}
        >
          <span>O</span>
          <input
            type="text"
            name="player1"
            id=""
            value={name1}
            className="w-[7em] text-center bg-gray-600 border-gray-500"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-yellow-700 rounded-md px-3 hover:scale-105"
          >
            SAVE
          </button>
        </div>
      </form>
      <form action={handleSubmit} className="flex-1">
        {" "}
        <div
          className={clsx(
            !currentPlayerID && "border-gray-500",
            "border  flex-1 h-[50px] font-sans font-bold text-white flex justify-around items-center",
          )}
        >
          <span>X</span>
          <input
            type="text"
            name="player2"
            id=""
            value={name2}
            className="w-[7em] text-center bg-gray-600 border-gray-700"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-yellow-700 rounded-md px-3 hover:scale-105"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
