/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { useSolanaPrice } from "../utils/util";
import { useWallet } from "@solana/wallet-adapter-react";
import { enterGame, playGame } from "../context/solana/transaction";
import { useSocket } from "../context/SocketContext";
import { PublicKey } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Head from "next/head";
import Chat from "../components/Chat";
import MobileChat from "../components/Chat/MobileChat";
import { base58ToGradient } from "../utils/util";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { generateFromString } from "generate-avatar";
import { Player } from "../utils/type";
import Sol_logo from "../../public/Solana_logo.png";
import Image from "next/image";
import UserListItem from "../components/user-list-item";
import HistoryDialog from "../components/history-dialog";
import {
  Box,
  Drawer,
  Grid,
  Hidden,
  Paper,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlayerSide from "@/components/dashboard-component/players-side";
import RoundInfoSide from "@/components/dashboard-component/round-info-side";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

if (typeof Highcharts === "object") {
  require("highcharts/highcharts-more")(Highcharts);
  require("highcharts/modules/solid-gauge")(Highcharts);
  // HighchartsExporting(Highcharts);
}
const drawerWidth = 300;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(6),
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(!isMobile &&
    open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  position: "relative",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isMobile: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!isMobile &&
    open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
}));
export default function Waiting() {
  const wallet = useWallet();
  const { gameData, winner } = useSocket();
  const [betAmount, setBetAmount] = useState(0.1);
  const [isBetLoading, setIsBetLoading] = useState(false);
  const { isLoading, isError, data, error } = useSolanaPrice();
  const [isRolling, setIsRolling] = useState(false);
  const [isWonWindow, setIsWonWindow] = useState(false);
  const [wonValue, setWonValue] = useState(0);
  const [isMobileChat, setIsMobileChat] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [start, setStart] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(NaN);

  const sumPots = useMemo(() => {
    if (gameData && gameData && gameData.players) {
      const sumBets = gameData.players.reduce(
        (sum: number, item: any) => sum + item.amount,
        0
      );
      return Math.round((sumBets * 100) / LAMPORTS_PER_SOL) / 100;
    } else {
      return 0;
    }
  }, [gameData]);

  const handleBet = async () => {
    try {
      if (gameData && gameData.players && gameData.players.length !== 0) {
        await enterGame(
          wallet,
          new PublicKey(gameData.pda),
          betAmount,
          setIsBetLoading,
          gameData.endTimestamp
        );
      } else {
        await playGame(wallet, betAmount, setIsBetLoading);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBetAmount = (value: number) => {
    setBetAmount(value);
  };

  const handleEndGame = () => {
    setIsWonWindow(false);
  };

  const winPercent = useMemo(() => {
    if (
      gameData &&
      gameData &&
      gameData.players &&
      gameData.players.length === 0
    ) {
      return 0;
    } else if (gameData) {
      const sumBets = gameData.players?.reduce(
        (sum: number, item: any) => sum + item.amount,
        0
      );
      if (wallet.publicKey !== null) {
        const userBet = gameData.players?.find(
          (item: any) => item.player === wallet.publicKey?.toBase58()
        );
        if (userBet) {
          return userBet.amount / sumBets;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  }, [gameData?.players, wallet.publicKey, wallet.connected]);
  // @ts-ignore
  const chartOptions: Highcharts.Options = useMemo(() => {
    return {
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 800,
            },
            chartOptions: {
              legend: {
                enabled: false,
              },
              // plotOptions: {
              //   pie: {
              //     dataLabels: {
              //       enabled: true,
              //     },

              //   },
              // },
            },
          },
        ],
      },
      chart: {
        type: "pie",
        backgroundColor: "transparent",
        events: {
          load: function () {
            const chart = this;
            console.log("chart===", chart, chart.plotHeight);
            let angle = 0;
            function drawTriangle() {
              const centerX = chart.plotWidth / 2 + chart.plotLeft;
              const centerY = chart.plotHeight / 10;
              const size = 12;

              //@ts-ignore
              chart.renderer
                //@ts-ignore
                .path([
                  "M",
                  centerX,
                  centerY - size,
                  "L",
                  centerX - size,
                  centerY - size * 2,
                  "L",
                  centerX + size,
                  centerY - size * 2,
                  "Z",
                ])
                .attr({
                  fill: "#ffcc00",
                  stroke: "#ffcc00",
                  "stroke-width": 2,
                  zIndex: 1000,
                })
                .add();
            }

            drawTriangle();

            // let angle = 0;
            let timeout: any;
            let interval: any;
            let temp = 2;
            let increase = true;
            let maxTemp = Math.random() * 100;
            let minTemp = 0;
            function rotate() {
              angle = (angle + temp) % 360;
              // temp += 1;

              console.log("angle==", angle, temp, increase);
              if (increase) {
                temp += 1;
                if (temp >= maxTemp) {
                  increase = false;
                }
              } else {
                temp -= 1;
                if (temp <= minTemp) {
                  temp = 0;
                  clearTimeout(timeout);
                  clearInterval(interval);
                }
              }
              if (chart.options) {
                chart.update(
                  {
                    plotOptions: {
                      pie: {
                        startAngle: angle,
                        // endAngle
                        animation: {
                          duration: 50,
                        },
                      },
                    },
                  },
                  true,
                  false,
                  false
                );
              }
              // temp += 1;
              timeout = setTimeout(rotate, 50);
            }
            interval = setInterval(rotate, 5000);
          },
          render: function () {
            const chart = this;
            const text = `${sumPots} SOL`;
            const countdownText = `Time left: 5s`;
            const style = {
              color: "#FFFFFF",
              fontSize: "20px",
              textAlign: "center",
            };
            //@ts-ignore
            if (!chart.customText) {
              //@ts-ignore
              chart.customText = chart.renderer
                .text(
                  text,
                  //@ts-ignore
                  chart.chartWidth / 2,
                  //@ts-ignore
                  chart.plotHeight / 2 + chart.plotTop
                )
                .css(style)
                .attr({
                  align: "center",
                  zIndex: 5,
                })
                .add();
            } else {
              //@ts-ignore
              chart.customText.attr({
                text: text,
                //@ts-ignore
                x: chart.chartWidth / 2,
                //@ts-ignore
                y: chart.plotHeight / 2 + chart.plotTop,
              });
            }

            //@ts-ignore
            if (!chart.countdownText) {
              //@ts-ignore
              chart.countdownText = chart.renderer
                .text(
                  countdownText,
                  //@ts-ignore
                  chart.chartWidth / 2,
                  //@ts-ignore
                  chart.plotHeight / 2 + chart.plotTop + 30
                )
                .css(style)
                .attr({
                  align: "center",
                  zIndex: 5,
                })
                .add();
            } else {
              //@ts-ignore
              chart.countdownText.attr({
                text: countdownText,
                //@ts-ignore
                x: chart.chartWidth / 2,
                //@ts-ignore
                y: chart.plotHeight / 2 + chart.plotTop + 30,
              });
            }
          },
          redraw: function () {
            const chart = this;

            //@ts-ignore
            if (chart.customText) {
              //@ts-ignore
              chart.customText.attr({
                //@ts-ignore
                x: chart.chartWidth / 2,
                //@ts-ignore
                y: chart.plotHeight / 2 + chart.plotTop,
              });
            }

            //@ts-ignore
            if (chart.countdownText) {
              //@ts-ignore
              chart.countdownText.attr({
                //@ts-ignore
                x: chart.chartWidth / 2,
                //@ts-ignore
                y: chart.plotHeight / 2 + chart.plotTop + 30,
              });
            }
          },
        },
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      pane: {
        center: ["50%", "50%"],
        startAngle: 0,
        endAngle: 360,
        size: "100%",
        background: {
          backgroundColor: "#080808",
          innerRadius: "100%",
          outerRadius: "100%",
          borderWidth: 10,
          shape: "arc",
        },
      },
      tooltip: {
        enabled: true,
      },
      yAxis: {
        min: 0,
        max: 60,
        stops: [[1.0, "#FAF9F6"]],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 0,
        labels: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          center: ["50%", "50%"],
          size: "100%",
          point: {
            events: {
              mouseOver: function (e) {
                console.log("e==", e);
                // Custom logic for hover event
                //@ts-ignore
                // console.log(`Hovering over: ${this.id}`);
                //@ts-ignore
                setHover(this.id);
              },
              mouseOut: function () {
                // Custom logic for hover out event
                //@ts-ignore
                setHover(NaN);
                // console.log(`No longer hovering over: ${this.id}`);
              },
            },
          },
        },
        solidgauge: {
          dataLabels: {
            enabled: false,
          },
          linecap: "round",
          rounded: false,
        },
      },
      colors: gameData?.players
        ? gameData?.players.map((item) => item.color)
        : ["#FF204E", "#F72798", "#F57D1F", "#EBF400"],
      series: [
        {
          type: "pie",
          name: "Amount",
          data: gameData?.players
            ? gameData?.players.map((item) => ({
                name: item.player,
                y: item.amount,
                id: item.id,
              }))
            : [
                { name: "Player 1", y: 0.5 },
                { name: "Player 2", y: 1 },
                { name: "Player 3", y: 0.75 },
                { name: "Player 4", y: 3 },
              ],
          innerSize: "65%",
        },
        {
          type: "solidgauge",
          name: "Countdown",
          data: [10],
          innerRadius: "100%",
          radius: "100%",
        },
      ],
    };
  }, [gameData?.players, start]);

  const gaugeChartOptions = {
    chart: {
      type: "solidgauge",
      backgroundColor: "",
    },
    title: {
      text: "",
    },
    pane: {
      center: ["50%", "50%"],
      size: "110%",
      startAngle: 0,
      endAngle: 360,
      background: {
        backgroundColor: "#080808",
        innerRadius: "90%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 100, // Example total time
      stops: [[1.0, "#ff99ds"]],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 0,
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        rounded: true,
      },
    },
    series: [
      {
        name: "Countdown",
        data: [20],
        innerRadius: "90%",
        radius: "100%",
      },
    ],
  };
  return (
    <div className="bg-[#080808] h-[100vh] flex">
      {/* Main Content */}
      <div className="flex-1">
        <AppBar
          position="fixed"
          open={isChatOpen}
          sx={{ boxShadow: "none" }}
          isMobile={isMobile}
        >
          <Toolbar>
            {/* <div className="flex items-center"> */}
            <div className="text-2xl font-bold text-white">DEGENPOT</div>
            {/* </div> */}
            <Box flexGrow={1} />
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsChatOpen(!isChatOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4l-4 4-4-4H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                </svg>
              </button>
              <a
                className="text-white hover:text-[#ffcc00] transition-colors"
                href="#"
              >
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a
                className="text-white hover:text-[#ffcc00] transition-colors"
                href="#"
              >
                <DiscIcon className="h-6 w-6" />
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <Main open={isChatOpen} isMobile={isMobile}>
          <Grid container justifyContent={"center"} height={"90vh"} px={6}>
            <Grid
              container
              maxWidth={"lg"}
              direction={"row"}
              alignItems={"stretch"}
              spacing={1}
              // px={2}
              // mx={4}
              mt={4}
            >
              <Hidden lgDown>
                <Grid item md={3}>
                  <PlayerSide
                    hovered={hover}
                    players={gameData ? gameData.players : []}
                    sumPots={sumPots}
                  />
                </Grid>
              </Hidden>
              <Grid item lg={6} sm={12} xs={12}>
                <Grid
                  container
                  flexDirection={"column"}
                  spacing={1}
                  // alignItems={"space-between"}
                  // alignItems={""}
                >
                  <Grid item height={"600px"}>
                    <Paper className="h-full rounded-xl p-4">
                      <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Grid item>
                          <Typography>Round #256789</Typography>
                        </Grid>
                        <Grid item>
                          <Grid container columnGap={1}>
                            {/* <div
                              className="border p-1 border-gray-500 rounded-lg cursor-pointer flex hover:bg-gray-500"
                              onClick={() => setStart(true)}
                            >
                              <ClockIcon className="mr-2" /> start
                            </div> */}
                            <div
                              className="border p-1 border-gray-500 rounded-lg cursor-pointer flex hover:bg-gray-500"
                              onClick={() => setOpen(true)}
                            >
                              <ClockIcon className="mr-2" /> History
                            </div>
                            <div className="border p-1 border-gray-500 cursor-pointer rounded-lg hover:bg-gray-500">
                              <ChevronLeftIcon />
                            </div>
                            <div className="border p-1 border-gray-500 cursor-pointer rounded-lg hover:bg-gray-500">
                              <ChevronRightIcon />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Box height={"100%"} alignContent={"center"}>
                        <HighchartsReact
                          // className="absolute right-0 bottom-0 top-0 left-0"
                          highcharts={Highcharts}
                          options={chartOptions}
                        />
                      </Box>
                      {/* <Grid container> */}
                      {/* </Grid> */}
                    </Paper>
                  </Grid>
                  <Hidden lgUp>
                    <Grid item>
                      <PlayerSide
                        hovered={hover}
                        players={gameData ? gameData.players : []}
                        sumPots={sumPots}
                      />
                    </Grid>
                  </Hidden>
                  <Grid item height={"fit-content"}>
                    <Paper className="h-full rounded-xl px-2 py-1">
                      <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Grid item>
                          <Typography>Round Contents</Typography>
                        </Grid>
                        <Grid item>
                          <Box display={"flex"} columnGap={1}>
                            <div className="border p-1 border-gray-500 cursor-pointer rounded-lg hover:bg-gray-500">
                              <ChevronLeftIcon />
                            </div>
                            <div className="border p-1 border-gray-500 cursor-pointer rounded-lg hover:bg-gray-500">
                              <ChevronRightIcon />
                            </div>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container my={1}>
                        <div className="w-[110px] border border-gray-700 rounded-xl bg-gray-500 flex flex-col items-stretch justify-between">
                          <div className="flex items-center justify-center h-[90px] ">
                            <Image
                              src={Sol_logo}
                              width={60}
                              height={60}
                              alt="sol-logo"
                            />
                          </div>
                          <div className="bg-gray-900 text-center text-white mt-2 py-2">
                            {sumPots} sol
                          </div>
                        </div>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden mdDown>
                <Grid item md={3} sm={3}>
                  <RoundInfoSide
                    sumPots={sumPots}
                    handleBet={handleBet}
                    handleBetAmount={handleBetAmount}
                    isBetLoading={isBetLoading}
                    winPercent={winPercent}
                    betAmount={betAmount}
                  />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Main>
        {/* <div className="bg-[#080808] flex flex-col items-center h-[90vh]  text-white"> */}
        {/* </div> */}
      </div>

      {/* Chat Box */}
      {/* {isChatOpen && ( */}
      <Drawer
        open={isChatOpen}
        onClose={() => {
          if (isMobile) {
            setIsChatOpen(false);
          }
        }}
        anchor="right"
        variant={isMobile ? "temporary" : "persistent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            p: 2,
          },
        }}
      >
        <Chat className="flex flex-col h-full" />
      </Drawer>
      {/* // <div className="w-[300px] h-[100vh] flex flex-col px-4 pt-4 border-l-[1px] border-[#FFFFFF3D] bg-[#121418]">
        // </div> */}
      {/* )} */}
      <HistoryDialog open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}

function ChevronLeftIcon(props: any) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

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

function FileQuestionIcon(props: any) {
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
      <path d="M12 17h.01" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
    </svg>
  );
}

function InfoIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function DiscIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
