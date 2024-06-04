import React from "react";
import { Player } from "../../utils/type";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { generateFromString } from "generate-avatar";

type Props = {
  item: Player;
  sumPots: number;
  hovered: number;
  winner: number;
};

const UserListItem = ({ item, sumPots, hovered, winner }: Props) => {
  // console.log("win==", winner);
  return (
    <div
      className="flex items-center justify-between mb-2 p-3 rounded-2xl relative"
      style={{
        border: `1px solid ${item.color}`,
        opacity: !Number.isNaN(hovered)
          ? hovered === item.id
            ? 1
            : 0.2
          : !Number.isNaN(winner)
          ? winner === item.id
            ? 1
            : 0.2
          : 1,
        background: !Number.isNaN(winner)
          ? winner === item.id
            ? "linear-gradient(111deg, rgba(253,202,45,0.3477766106442577) 0%, rgba(175,195,34,0.0844712885154062) 85%)"
            : "none"
          : "none",
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${generateFromString(item.player)}`}
        className="w-8 h-8 rounded-full"
      />

      <div className="flex-1 ml-2">
        <div className="text-sm">
          {item.player.slice(0, 3)}...
          {item.player.slice(-3)}
          {winner === item.id && (
            <img className="inline-block ml-3" src="/crown.png" width={16} />
          )}
        </div>
        <div className="text-xs text-gray-400">
          {(item.amount / LAMPORTS_PER_SOL).toLocaleString()} SOL
        </div>
      </div>
      <div className="text-right mr-5">
        <div className="text-sm">
          {Math.round(
            (((item.amount / LAMPORTS_PER_SOL) * 100) / sumPots) * 100
          ) / 100}
          %
        </div>{" "}
      </div>
      <div
        className="absolute right-0 w-5 h-[100%] rounded-e-2xl"
        style={{ backgroundColor: item.color }}
      />
    </div>
  );
};

export default UserListItem;
