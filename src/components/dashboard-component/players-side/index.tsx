import UserListItem from "@/components/user-list-item";
import { Player } from "@/utils/type";
import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import React from "react";

type Props = {
  players: Player[];
  sumPots: number;
};

const Root = styled(Paper)(({ theme }) => ({
  // backgroundColor:"red",
  padding: 12,
  height: "100%",
  borderRadius: 6,
  // display:"flex",
}));

const PlayerSide = ({ players, sumPots }: Props) => {
  return (
    <Root>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <Typography variant="subtitle1">1 Players</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <EyeIcon className="h-5 w-5 text-[#7e18ff]" />
            <span className="ml-2">1 Watching</span>
          </Grid>
        </Grid>
      </Grid>
      {players.length === 0 ? (
        <div className="mx-8 rounded-xl border-[1px] border-[#ffffff50] bg-[#04134A] py-5 mt-[55px] text-[14px] text-[#6a71f8] font-bold text-center">
          {`Noone has entered this room yet... Be the first! :)`}
        </div>
      ) : (
        <div className="mt-4">
          {players?.map((item: Player, key: number) => (
            <UserListItem item={item} sumPots={sumPots} key={key} />
          ))}
        </div>
      )}
    </Root>
  );
};

export default PlayerSide;

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
