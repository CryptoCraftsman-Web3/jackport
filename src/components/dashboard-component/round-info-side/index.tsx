import { Box, Grid, Paper, styled, useTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";

type Props = {
  sumPots: number;
  winPercent: number | undefined;
  handleBetAmount: (e: number) => void;
  betAmount: number;
  entry: number;
  handleBet: () => void;
  isBetLoading: boolean;
  playersCount: number;
  isMobile?: boolean;
};

const Root = styled(Paper)(({ theme }) => ({
  padding: 12,
  height: "100%",
  borderRadius: 6,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    position: "fixed",
    top: "auto",
    bottom: 0,
    right: 0,
    left: 0,
    height: "auto",
    borderRadius: "30px 30px 0px 0px",
    paddingTop: 50,
    // with: "100%",
  },
}));

const TimerBox = styled(Box)(({ theme }) => ({
  border: "3px solid green",
  borderRadius: 6,
  padding: 6,
  color: green["A700"],
  fontWeight: 900,
  fontSize: 20,
}));
const RoundInfoSide = ({
  sumPots,
  winPercent,
  handleBetAmount,
  betAmount,
  handleBet,
  isBetLoading,
  playersCount,
  isMobile,
  entry,
}: Props) => {
  const wallet = useWallet();
  const [time, setTime] = useState<number>(15);
  let timer = setTimeout(() => {
    setTime(time - 1);
  }, 1000);

  if (time === 0) {
    clearTimeout(timer);
  }
  const theme = useTheme();
  return (
    <Root>
      {isMobile ? (
        <>
          <Box position={"absolute"} top={6} right={20}>
            <div className="mb-4 flex items-center">
              <h2 className="text-xl font-bold mr-4">Round #51920</h2>
              <TimerBox>
                00:{time.toLocaleString().length === 2 ? time : `0${time}`}
              </TimerBox>
            </div>
          </Box>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <div className="bg-[#202329] p-4 rounded-lg w-[180px]">
              <div className="flex items-center justify-between">
                <div className="text-sm">Prize Pool</div>
                <div className="text-sm">{sumPots}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Players</div>
                <div className="text-sm">{playersCount}/100</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Your Entries</div>
                <div className="text-sm">{entry} sol</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Your Win Chance</div>
                <div className="text-sm">
                  {winPercent ? Math.round(winPercent * 10000) / 100 : 0}
                </div>
              </div>
            </div>
            <div className="text-white p-4 rounded-md">
              <div className="rounded-md p-4">
                {wallet.publicKey ? (
                  <div>
                    <div className="relative mb-4">
                      <input
                        className="bg-stone-950 text-sm py-1 px-3 w-full border-2 border-zinc-800 rounded-md text-gray-200"
                        placeholder="Amount of SOL"
                        type="number"
                        value={betAmount}
                        step={0.1}
                        onChange={(e) =>
                          handleBetAmount(e.target.value as unknown as number)
                        }
                      />
                    </div>

                    <div className="flex gap-1 mb-4">
                      <div
                        className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer"
                        onClick={() => {
                          handleBetAmount(0.1);
                        }}
                      >
                        0.1 SOL
                      </div>
                      <div
                        className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer"
                        onClick={() => {
                          handleBetAmount(0.5);
                        }}
                      >
                        0.5 SOL
                      </div>
                      <div
                        className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer"
                        onClick={() => {
                          handleBetAmount(5);
                        }}
                      >
                        5 SOL
                      </div>
                    </div>
                    <button
                      className="bg-[#7e18ff] text-sm font-medium py-2 px-4 w-full rounded-md text-white"
                      onClick={handleBet}
                      disabled={isBetLoading}
                    >
                      {isBetLoading ? (
                        <>Waiting...</>
                      ) : (
                        <>Add {betAmount} SOL to bet</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="playground">
                    <WalletMultiButton />
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </>
      ) : (
        <>
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-bold">Round #51920</h2>
            <TimerBox>
              00:{time.toLocaleString().length === 2 ? time : `0${time}`}
            </TimerBox>
          </div>
          <div className="space-y-4">
            <div className="bg-[#202329] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm">Prize Pool</div>
                <div className="text-sm">{sumPots}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Players</div>
                <div className="text-sm">{playersCount}/100</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Your Entries</div>
                <div className="text-sm">{entry} sol</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Your Win Chance</div>
                <div className="text-sm">
                  {" "}
                  {winPercent ? Math.round(winPercent * 10000) / 100 : 0} %
                </div>
              </div>
            </div>

            <div className="text-white p-4 rounded-md">
              <div className="rounded-md p-4">
                {wallet.publicKey ? (
                  <div>
                    <div className="relative mb-4">
                      <input
                        className="bg-stone-950 text-sm py-1 px-3 w-full border-2 border-zinc-800 rounded-md text-gray-200"
                        placeholder="Amount of SOL"
                        type="number"
                        value={betAmount}
                        step={0.1}
                        onChange={(e) =>
                          handleBetAmount(e.target.value as unknown as number)
                        }
                      />
                    </div>

                    <div className="flex gap-1 mb-4">
                      <div
                        className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer"
                        onClick={() => {
                          handleBetAmount(0.1);
                        }}
                      >
                        0.1 SOL
                      </div>
                      <div
                        className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer"
                        onClick={() => {
                          handleBetAmount(0.5);
                        }}
                      >
                        0.5 SOL
                      </div>
                      <div
                        className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer"
                        onClick={() => {
                          handleBetAmount(5);
                        }}
                      >
                        5 SOL
                      </div>
                    </div>
                    <button
                      className="bg-[#7e18ff] text-sm font-medium py-2 px-4 w-full rounded-md text-white"
                      onClick={handleBet}
                      disabled={isBetLoading}
                    >
                      {isBetLoading ? (
                        <>Waiting...</>
                      ) : (
                        <>Add {betAmount} SOL to bet</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="playground">
                    <WalletMultiButton />
                  </div>
                )}
              </div>
            </div>
            {/* <Button className="w-full" variant="secondary">
  Round Closed
</Button> */}
          </div>
        </>
      )}
    </Root>
  );
};

export default RoundInfoSide;
