import { Paper, styled } from '@mui/material'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

type Props = {
    sumPots:number,
    winPercent:number|undefined,
    handleBetAmount:(e:number) =>void,
    betAmount:number,
    handleBet:() => void,
    isBetLoading:boolean
}

const Root = styled(Paper)(({theme}) => ({
    padding:12,
    height:"100%",
    borderRadius:6

}))
const RoundInfoSide = ({sumPots,winPercent,handleBetAmount,betAmount,handleBet,isBetLoading}: Props) => {
    const wallet = useWallet();

  return (
    <Root><div className="mb-4">
    <h2 className="text-xl font-bold">Round #51920</h2>
  </div>
  <div className="space-y-4">
    <div className="bg-[#202329] p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="text-sm">Prize Pool</div>
        <div className="text-sm">{sumPots}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">Players</div>
        <div className="text-sm">1/100</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">Your Entries</div>
        <div className="text-sm">-</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">Your Win Chance</div>
        <div className="text-sm">{winPercent}</div>
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
                  handleBetAmount(
                    e.target.value as unknown as number
                  )
                }
              />
            </div>

            <div className="flex gap-1 mb-4">
              <div className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer">
                0.1 SOL
              </div>
              <div className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer">
                0.5 SOL
              </div>
              <div className="bg-[#202329] py-1 px-3 flex rounded-md cursor-pointer">
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
  </div></Root>
  )
}

export default RoundInfoSide