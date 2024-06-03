import Image from "next/image";
import React from "react";

type Props = {};

const SolLogo = (props: Props) => {
  return (
    <img
      src={"/Solana_logo.png"}
      width={"26px"}
      alt="sol-logo"
      //   className=""
    />
  );
};

export default SolLogo;
