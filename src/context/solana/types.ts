
import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const VAULT_SEED = "vault-authority";
export const GAME_SEED = "game-authority";
export const RANDOM_SEED = "random";

export const JACKPOT_PROGRAM_ID = new PublicKey("GW1skJjMinzebYXAYTLEncM7Fge9Y2S6qxt7YhsHbrbo");
export const TEAM_WALLET  = new PublicKey("GFRmyUE3Sn8VEfrrKL7uQUHBH8mkYTcsFJyo3dqPYjCT");
export interface GamePool {
  startTs: anchor.BN,
  rand: anchor.BN,
  totalDeposit: anchor.BN,
  claimed: anchor.BN,
  winner: PublicKey,
  entrants: PublicKey[],
  depositAmounts: anchor.BN[]
}