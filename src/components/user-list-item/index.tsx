import React from "react";
import { Player } from "../../utils/type";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { generateFromString } from "generate-avatar";

type Props = {
    item:Player
    sumPots:number
};

const UserListItem = ({item,sumPots}: Props) => {
  return (
    <div
      className="flex items-center justify-between mb-2 p-2 rounded-2xl"
      style={{ border: `1px solid ${item.color}` }}
    >
      <img
        src={`data:image/svg+xml;utf8,${generateFromString(item.player)}`}
        className="w-8 h-8 rounded-full"
      />
      {/* <img
                            src="/placeholder.svg"
                            alt="player avatar"
                            className="w-8 h-8 rounded-full"
                          /> */}
      <div className="flex-1 ml-2">
        <div className="text-sm">
          {item.player.slice(0, 3)}...
          {item.player.slice(-3)}
        </div>
        <div className="text-xs text-gray-400">
          {(item.amount / LAMPORTS_PER_SOL).toLocaleString()} SOL
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm">
          {Math.round(
            (((item.amount / LAMPORTS_PER_SOL) * 100) / sumPots) * 100
          ) / 100}
          %
        </div>{" "}
      </div>
      <div className={`w-3 h-3`} style={{ backgroundColor: item.color }} />
    </div>
  );
};

export default UserListItem;
