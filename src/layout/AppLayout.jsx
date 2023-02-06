import { useState } from 'react';
import ProcessTable from '../ProcessTable';
import {
	Grid,
	Button,
	Alert,
	IconButton,
	AlertTitle,
	Zoom,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const AppLayout = () => {
	const [errorText, setErrorText] = useState([['', '']]);

	const createData = () => {
		// generate a random PID between 0 - 100
		const pid = Math.floor(Math.random() * (999 - 101 + 1)) + 101;

		return {
			pid,
			arrivalTime: '',
			burstTime: '',
			completionTime: '',
			turnAroundTime: '',
			waitingTime: '',
			responseTime: '',
		};
	};

	// array of objects containing process data
	const [processes, setProcesses] = useState([createData()]);
	const [alertOpen, setAlertOpen] = useState(false);

	const modalClose = () => setAlertOpen(false);

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

		error ? setAlertOpen(true) : console.log(processes);
	};

	return (
		<Grid
			container
			alignItems='flex-start'
			justifyContent='center'
			sx={{
				p: '2.5vh 2.5vw',
				height: '100vh',
				// enable scroll and hide scrollbar
				overflow: 'scroll',
				'&::-webkit-scrollbar': { display: 'none' },
			}}
		>
			<Grid
				item
				sx={{
					width: '100%',
					height: '85vh',
					overflow: 'scroll',
					'&::-webkit-scrollbar': { display: 'none' },
				}}
			>
				<ProcessTable
					processes={processes}
					setProcesses={setProcesses}
					errorText={errorText}
					setErrorText={setErrorText}
				/>
			</Grid>
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
			<Grid item>
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
							zIndex: '9999',
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
		</Grid>
	);
};

export default AppLayout;
