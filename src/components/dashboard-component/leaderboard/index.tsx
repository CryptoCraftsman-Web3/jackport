import { Button, ButtonGroup, Grid, Paper, styled } from "@mui/material";
import React, { useState } from "react";
import UserItem from "./UserItem";
import { ILeaderBoardUser } from "@/utils/type";

type Props = {};

const Root = styled(Paper)(({ theme }) => ({
  padding: 12,
  // height: "100%",
  borderRadius: 6,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  //   [theme.breakpoints.down("md")]: {
  //     flexDirection: "row",
  //     position: "fixed",
  //     top: "auto",
  //     bottom: 0,
  //     right: 0,
  //     left: 0,
  //     height: "auto",
  //     borderRadius: "30px 30px 0px 0px",
  //     paddingTop: 50,
  //     // with: "100%",
  //   },
}));

const users: ILeaderBoardUser[] = [
  {
    name: "@skips",
    amount: 230,
  },
  {
    name: "@spaqxi",
    amount: 150,
  },
  {
    name: "@david",
    amount: 79,
  },
  {
    name: "@morales",
    amount: 67,
  },
];
const Leaderboard = (props: Props) => {
  const [step, setStep] = useState<number>(0);
  return (
    <Root>
      <Grid container>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {/* <Button>yesterday</Button> */}
          <Button
            onClick={() => setStep(0)}
            variant={step === 0 ? "contained" : "outlined"}
          >
            today
          </Button>
          <Button
            onClick={() => setStep(1)}
            variant={step === 1 ? "contained" : "outlined"}
          >
            1 w
          </Button>
          <Button
            onClick={() => setStep(2)}
            variant={step === 2 ? "contained" : "outlined"}
          >
            1 m
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid container mt={2} flexDirection={"column"}>
        {users.map((item, index) => (
          <UserItem {...item} />
        ))}
      </Grid>
    </Root>
  );
};

export default Leaderboard;
