import {
  Button,
  Dialog,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SolLogo from "../SolLogo";
import moment from "moment";
type Props = {
  open: boolean;
  handleClose: () => void;
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const HistoryDialog = ({ open, handleClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      sx={{ p: 5 }}
      PaperProps={{ sx: { p: 4 } }}
    >
      <div>
        <Button startIcon={<ArrowBackIcon />} onClick={handleClose}>
          Current Round
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: 8, mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "grey" }}>Round</TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Winner
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Prize Pool
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Winner Entries
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Win
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Your Entries
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Players
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Finish
              </TableCell>
              <TableCell align="right" sx={{ color: "grey" }}>
                Verify
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">
                  <Grid container justifyContent={"flex-end"}>
                    <SolLogo />
                    <Typography ml={2}>{row.fat}</Typography>
                  </Grid>{" "}
                </TableCell>
                <TableCell align="right"> {row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  {moment(Date.now()).format("dd.mm.MM.YYYY")}
                </TableCell>
                <TableCell align="right">
                  <OpenInNewIcon fontSize="small" sx={{ cursor: "pointer" }} />
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};

export default HistoryDialog;
