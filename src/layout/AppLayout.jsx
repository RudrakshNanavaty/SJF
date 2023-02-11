import { useState } from "react";
import ProcessTable from "../ProcessTable";
import { Grid, Button } from "@mui/material";
import axios from "axios";

const AppLayout = () => {
  const [pid, setPID] = useState(101);

  const createData = () => {
    // generate a random PID between 0 - 100
    // pid = Math.floor(Math.random() * (999 - 101 + 1)) + pid;
    setPID((pid) => pid + 1);
    console.log({ pid });
    return {
      pid: pid,
      at: undefined,
      at: undefined,
      ct: undefined,
      tat: undefined,
    };
  };
  // array of objects containing process data
  const [processes, setProcesses] = useState(() => {
    setPID((pid) => pid + 1);
    return [createData()];
  });

  const addProcess = () => {
    setProcesses([...processes, createData()]);
  };

  const calculateProcess = async () => {
  const response =  await axios.post("http://localhost:3000/scheduling/sjf", {processes});
  console.log(response);
  console.log(response.data);

  };

  return (
    <Grid
      container
      onSubmit={calculateProcess}
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        p: "2.5vh 2.5vw",
        height: "100vh",
        // enable scroll and hide scrollbar
        overflow: "scroll",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Grid
        item
        sx={{
          width: "100%",
          height: "75vh",
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <ProcessTable processes={processes} setProcesses={setProcesses} />
      </Grid>
      <Grid item>
        <Button onClick={addProcess} variant="contained" sx={{ m: "20px" }}>
          ADD PROCESS
        </Button>
        <Button
          variant="contained"
          onClick={calculateProcess}
          sx={{ m: "20px" }}
        >
          CALCULATE
        </Button>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
