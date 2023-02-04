import { useState } from "react";
import ProcessTable from "../ProcessTable";
import { Grid, Button } from "@mui/material";

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

  //   const calculateProcess = () => {
  //     processes.forEach((process) => {
  //       process.at = parseInt(process.at);
  //       process.bt = parseInt(process.bt);
  // 	  process.isCompleted = false;
  //     });
  //     processes.sort((p1, p2) => (p1.at > p2.at ? 1 : p1.at < p2.at ? -1 : 0));
  //     let currentTime = 0;
  //     processes.forEach((process) => {
  //       process.waitingTime = currentTime - process.at;
  //       process.responseTime = process.waitingTime;
  //       currentTime += process.bt;
  //       process.ct = currentTime;
  //       process.tat = process.ct - process.at;

  // 	});
  //     console.log(processes);
  //   };
  const calculateProcess = () => {
    processes.forEach((process) => {
      process.at = parseInt(process.at);
      process.bt = parseInt(process.bt);
      process.isCompleted = false;
    });
    processes.sort((p1, p2) => (p1.at > p2.at ? 1 : p1.at < p2.at ? -1 : 0));
    console.log("Before", processes);
    let currentTime = processes[0].at;
    for (let i = 0; i < processes.length; i++) {
      console.log(currentTime);

      let availableJobs = processes.filter(
        (process) => process.at <= currentTime && process.isCompleted == false
      );
      let shortestJob = availableJobs.reduce(function (prev, curr) {
        return prev.bt < curr.bt ? prev : curr;
      });

      shortestJob.waitingTime = currentTime - shortestJob.at;
      shortestJob.responseTime = shortestJob.waitingTime;
      currentTime += shortestJob.bt;
      shortestJob.ct = currentTime;
      shortestJob.tat = shortestJob.ct - shortestJob.at;
      shortestJob.isCompleted = true;

      processes[
        processes.indexOf((process) => process.pid == shortestJob.pid)
      ] = shortestJob;
    }

    function doWork(process) {
      process.waitingTime = currentTime - process.at;
      process.responseTime = process.waitingTime;
      currentTime += process.bt;
      process.ct = currentTime;
      process.tat = process.ct - process.at;
      process.isCompleted = true;
      return process;
    }

    console.log(processes);
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
