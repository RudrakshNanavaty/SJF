import { useState } from 'react';
// MUI
import {
	Grid,
	Button,
	Alert,
	IconButton,
	AlertTitle,
	Zoom
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
// local files
import ProcessTable from '../components/ProcessTable';

const AppLayout = () => {
	const [pid, setPID] = useState(101);

	const createData = () => {
		setPID(pid + 1);

		return {
			pid,
			arrivalTime: '',
			burstTime: '',
			completionTime: '',
			turnAroundTime: '',
			waitingTime: '',
			responseTime: ''
		};
	};

	// list of objects containing process data
	const [processes, setProcesses] = useState(() => {
		setPID(pid + 1);
		return [createData()];
	});
	// list of objects containing error data
	const [errorText, setErrorText] = useState([['', '']]);
	// control wether alert is open or not1
	const [alertOpen, setAlertOpen] = useState(false);

	const addProcess = () => {
		setErrorText([...errorText, ['', '']]);
		setProcesses([...processes, createData()]);
	};

	const calculateProcess = () => {
		let error = false;

		processes.forEach((process, index) => {
			if (process.arrivalTime === '') {
				const t = errorText;
				t[index][0] = 'Empty';
				setErrorText(t);
				error = true;
			} else {
				const t = errorText;
				t[index][0] = '';
				setErrorText(t);
			}

			if (process.burstTime === '') {
				const t = errorText;
				t[index][1] = 'Empty';
				setErrorText(t);
				error = true;
			} else {
				const t = errorText;
				t[index][1] = '';
				setErrorText(t);
			}
		});

		if (!error) {
			processes.forEach(process => {
				process.arrivalTime = parseInt(process.arrivalTime);
				process.burstTime = parseInt(process.burstTime);
				process.isCompleted = false;
			});

			processes.sort((p1, p2) =>
				p1.arrivalTime > p2.arrivalTime
					? 1
					: p1.arrivalTime < p2.arrivalTime
					? -1
					: 0
			);

			let currentTime = processes[0].arrivalTime;

			for (let i = 0; i < processes.length; i++) {
				let availableJobs = processes.filter(
					process =>
						process.arrivalTime <= currentTime &&
						process.isCompleted == false
				);

				let shortestJob = availableJobs.reduce(function (prev, curr) {
					return prev.burstTime < curr.burstTime ? prev : curr;
				});

				shortestJob.waitingTime = currentTime - shortestJob.arrivalTime;

				shortestJob.responseTime = shortestJob.waitingTime;

				currentTime += shortestJob.burstTime;

				shortestJob.completionTime = currentTime;

				shortestJob.turnAroundTime =
					shortestJob.completionTime - shortestJob.arrivalTime;

				shortestJob.isCompleted = true;

				processes[
					processes.indexOf(process => process.pid == shortestJob.pid)
				] = shortestJob;

				setProcesses();
			}
		} else {
			setAlertOpen(true);
		}
	};

	return (
		<Grid
			container
			alignItems='flex-start'
			justifyContent='center'
			sx={{
				p: '2.5vh 2.5vw',
				height: '100vh',
				overflow: 'scroll',
				'&::-webkit-scrollbar': { display: 'none' }
			}}
		>
			{/* Table Component */}
			<Grid
				item
				xs={12}
				sm={10}
				sx={{
					width: '100%',
					height: '85vh',
					borderRadius: '12px',
					overflow: 'scroll',
					'&::-webkit-scrollbar': { display: 'none' }
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
					variant='contained'
					sx={{ m: '20px' }}
					disabled={alertOpen}
				>
					ADD PROCESS
				</Button>
				<Button
					variant='contained'
					onClick={calculateProcess}
					sx={{ m: '20px' }}
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
						variant='filled'
						severity='error'
						sx={{
							m: '0',
							width: '100vw - 4vh',
							position: 'absolute',
							left: '2vh',
							right: '2vh',
							bottom: '2vh',
							zIndex: 'modal'
						}}
						action={
							<IconButton
								color='inherit'
								onClick={() => setAlertOpen(false)}
							>
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
