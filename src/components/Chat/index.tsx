/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../config";
import { useSocket } from "../../context/SocketContext";
import { Discordimage, Downarrow, RightSvg } from "../Svglist"
import ChatItem from "./ChatItem"

export default function Chat(props: { className: string }) {
    const wallet = useWallet();
    const { messages, onlined } = useSocket();
    const [message, setMessage] = useState("");

    const handleMessage = (value: string) => {
        setMessage(value);
    }

    const handleKeyDown = (event: { keyCode: number; }) => {
        if (event.keyCode === 13) {
            console.log("message =>", message)
            handleSubmit();
        }
    }
    const handleSubmit = async () => {
        if (wallet.publicKey === null || message === "") return;
        try {
            await axios.post(`${API_URL}writeMessage/`, {
                user: wallet.publicKey.toBase58(),
                msg: message
            });
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
<div className={`${props.className} flex flex-col h-full`}>
  <div className="flex flex-row justify-between items-center">
    <p className="text-[18px] text-[#FFFFFFA8] font-normal uppercase">Welcome!</p>
  </div>
  <p className="text-[12px] text-[#ffffff] font-normal pb-3 mt-3 leading-[29px] border-b-[1.33px] border-[#FFFFFF0F]">
    {onlined} Players Online
  </p>
  <div className="flex-1 overflow-auto scrollbar mt-2 flex flex-col-reverse">
    {messages && messages.length !== 0 &&
      messages.map((item, key) => (
        <ChatItem name={item.user_name} time={item.timestamp} message={item.message} key={key} />
      ))}
  </div>
  <div className="px-4  border-t-[1px] border-[#FFFFFF3D]">
    <div className="border-t-[1.33px] border-[#FFFFFF0F]"></div>
    <input
      type="text"
      className="w-full mt-5 bg-[#191c21] text-[14px] text-white-100 border-[1.33px] border-[#FFFFFF21] rounded-[8px] py-3 px-3"
      value={message}
      onChange={(e) => handleMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Say something in chat..."
    />
    <div className="flex flex-row my-4 items-center justify-between">

      <button
        className="bg-[#191c21] rounded-[8px] border-[1px] border-[#FFFFFF42] h-8 items-center text-center text-[12px] text-white-100 px-3 font-bold"
        onClick={handleSubmit}
      >
        SEND
      </button>
    </div>
  </div>
</div>

    )
}
