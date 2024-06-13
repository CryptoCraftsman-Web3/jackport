import { ILeaderBoardUser } from "@/utils/type";
import { Grid, Typography } from "@mui/material";
import { generateFromString } from "generate-avatar";
import React from "react";

const UserItem = ({ name, amount }: ILeaderBoardUser) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      my={1}
    >
      <Grid item>
        <Grid container alignItems={"center"}>
          <img
            src={`data:image/svg+xml;utf8,${generateFromString(name)}`}
            className="w-8 h-8 rounded-full"
          />
          <Typography ml={2}>{name}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>{amount} sol</Typography>
      </Grid>
    </Grid>
  );
};

export default UserItem;
