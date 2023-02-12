import { useState } from "react";
// MUI
import {
  Grid,
  Button,
  Alert,
  IconButton,
  AlertTitle,
  Zoom,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
// local files
import ProcessTable from "../components/ProcessTable";
import axios from "axios";

const AppLayout = () => {
  const [pid, setPID] = useState(101);

  const createData = () => {
    setPID(pid + 1);

    return {
      pid,
      arrivalTime: "",
      burstTime: "",
      completionTime: "",
      turnAroundTime: "",
      waitingTime: "",
      responseTime: "",
    };
  };

  // list of objects containing process data
  const [processes, setProcesses] = useState(() => {
    setPID(pid + 1);
    return [createData()];
  });
  // list of objects containing error data
  const [errorText, setErrorText] = useState([["", ""]]);
  // control wether alert is open or not1
  const [alertOpen, setAlertOpen] = useState(false);

  const addProcess = () => {
    setErrorText([...errorText, ["", ""]]);
    setProcesses([...processes, createData()]);
  };

  const calculateProcess = async () => {
    let error = false;

    processes.forEach((process, index) => {
      if (process.arrivalTime === "") {
        const t = errorText;
        t[index][0] = "Empty";
        setErrorText(t);
        error = true;
      } else {
        const t = errorText;
        t[index][0] = "";
        setErrorText(t);
      }

      if (process.burstTime === "") {
        const t = errorText;
        t[index][1] = "Empty";
        setErrorText(t);
        error = true;
      } else {
        const t = errorText;
        t[index][1] = "";
        setErrorText(t);
      }
    });

    if (!error) {
      const axios_response = await axios.post(
        "http://localhost:3000/scheduling/sjf",
        { processes }
      );
      setProcesses(axios_response.data.data.result);
      console.log(axios_response.data.data.result);
    } else {
      setAlertOpen(true);
    }
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        p: "2.5vh 2.5vw",
        height: "100vh",
        overflow: "scroll",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* Table Component */}
      <Grid
        item
        xs={12}
        sm={10}
        sx={{
          width: "100%",
          height: "85vh",
          borderRadius: "12px",
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <ProcessTable
          processes={processes}
          setProcesses={setProcesses}
          errorText={errorText}
          setErrorText={setErrorText}
        />
      </Grid>

      {/* Table action buttons */}
      <Grid item>
        <Button
          onClick={addProcess}
          variant="contained"
          sx={{ m: "20px" }}
          disabled={alertOpen}
        >
          ADD PROCESS
        </Button>
        <Button
          variant="contained"
          onClick={calculateProcess}
          sx={{ m: "20px" }}
          disabled={alertOpen}
        >
          CALCULATE
        </Button>
      </Grid>

      {/* Alert to display in case of error */}
      <Grid item>
        {/* Alert animation */}
        <Zoom in={alertOpen}>
          <Alert
            variant="filled"
            severity="error"
            sx={{
              m: "0",
              width: "100vw - 4vh",
              position: "absolute",
              left: "2vh",
              right: "2vh",
              bottom: "2vh",
              zIndex: "modal",
            }}
            action={
              <IconButton color="inherit" onClick={() => setAlertOpen(false)}>
                <CloseRounded />
              </IconButton>
            }
          >
            <AlertTitle>Error!</AlertTitle>
            Please enter all the values.
          </Alert>
        </Zoom>
      </Grid>
      <Grid item xs={12} sm={10}>
        {/* Gantt Chart */}
      </Grid>
    </Grid>
  );
};

export default AppLayout;
