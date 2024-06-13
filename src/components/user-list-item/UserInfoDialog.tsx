import {
  Button,
  Dialog,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import SolLogo from "../SolLogo";
import React, { useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { generateFromString } from "generate-avatar";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  open: boolean;
  handleClose: () => void;
  name: string;
};

function createData(value: string, category: string, badge: React.ReactNode) {
  return { value, category, badge };
}

const rows = [
  createData("6438", "Played", <SportsBasketballIcon />),
  createData("735", "Won", <DiamondIcon />),
  createData("9.99", "Biggest Win", <EmojiEventsIcon />),
  createData("298x", "Luckiest Win", <FaceRetouchingNaturalIcon />),
];

const UserInfoDialog = ({ open, handleClose, name }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      scroll="body"
      onClose={handleClose}
      sx={{ p: 5 }}
      PaperProps={{ sx: { p: 4 } }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ padding: 0 }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item>
            <div className="flex flex-col items-center">
              <img
                src={`data:image/svg+xml;utf8,${generateFromString(name)}`}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex items-center pt-3">
                <Typography>
                  {name.slice(0, 3) + "..." + name.slice(-3)}
                </Typography>
                <WorkspacePremiumIcon />
              </div>
            </div>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item>
              <div className="flex justify-between items-center">
                <Typography fontWeight="800" color={"grey"}>
                  Past Rounds
                </Typography>
                <Button endIcon={<OpenInNewIcon />}>View Wallet</Button>
              </div>
            </Grid>
            <Grid item>
              <Card
                className="w-100 border"
                sx={{ borderRadius: "20px", borderColor: "#555" }}
              >
                <Grid container>
                  {rows.map((row, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} md padding={2}>
                        <div className="h-full flex flex-col justify-between">
                          <Typography variant="h5">{row.value}</Typography>
                          <div className="flex items-center pt-2">
                            <Typography color={"grey"}>
                              {row.category}
                            </Typography>
                            <div className="ps-2">{row.badge}</div>
                          </div>
                        </div>
                      </Grid>
                      {index < rows.length - 1 && (
                        <Divider orientation="vertical" flexItem />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Typography fontWeight="800" color={"grey"}>
                This Round
              </Typography>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Card sx={{ borderRadius: "20px" }}>
                  <CardContent>
                    <Grid item container spacing={2}>
                      <Grid xs={12} md item>
                        <div>
                          <div className="flex items-center">
                            <SolLogo />
                            <Typography variant="h5" px={1}>
                              0.1
                            </Typography>
                          </div>
                          <Typography color="grey">Entries Value</Typography>
                        </div>
                      </Grid>
                      <Grid xs={12} md item>
                        <div>
                          <Typography variant="h5">50%</Typography>
                          <Typography color="grey">Win Chance</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item container alignItems="center" px={1}>
                <Grid xs item>
                  <div className="flex items-center">
                    <SolLogo />
                    <Typography variant="h5" px={1}>
                      0.1 SOL
                    </Typography>
                  </div>
                </Grid>
                <Grid xs item>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <SolLogo />
                      <Typography px={1}>0.1</Typography>
                    </div>
                    <Typography color="grey">$360.87</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDialog;
