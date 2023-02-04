// MUI
import { RemoveCircleOutlineRounded } from '@mui/icons-material';
import { TextField, IconButton, Paper, Button } from '@mui/material';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { Box } from '@mui/system';

const ProcessTable = props => {
	const { processes, setProcesses } = props;

	const arrivalTimeUpdate = (event, index) => {
		const t = processes;
		t[index]['at'] = event.target.value;
		setProcesses(t);
	};

	const burstTimeUpdate = (event, index) => {
		const t = processes;
		t[index]['bt'] = event.target.value;
		setProcesses(t);
	};

	const addProcess = () => {
		setProcesses([...processes, createData()]);
	};

	const deleteProcess = (event, index) => {
		const t = [
			...processes.slice(0, index),
			...processes.slice(index + 1, processes.length),
		];
		setProcesses(t);
	};

	const calculateProcess = () => {
		console.log(processes);
	};

	return (
		<Box>
			<TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
				<Table
					component='form'
					sx={{
						borderRadius: '12px',
						backgroundColor: 'grey.900',
					}}
				>
					{/* Table Header */}
					<TableHead>
						<TableRow>
							<TableCell align='center'>PID</TableCell>

							<TableCell align='center'>
								Arrival Time (AT)
							</TableCell>
							<TableCell align='center'>
								Burst Time (BT)
							</TableCell>

							<TableCell align='center'>
								Completion Time (CT)
							</TableCell>

							<TableCell align='center'>
								Turn around time (CT - AT)
							</TableCell>

							<TableCell align='center'>Waiting Time</TableCell>

							<TableCell align='center'>ResponseTime</TableCell>

							<TableCell align='center' />
						</TableRow>
					</TableHead>

					{/* Table Body */}
					<TableBody>
						{processes.map((process, i) => (
							<TableRow
								key={process.pid}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}
							>
								{/* PID Cell */}
								<TableCell>{process.pid}</TableCell>

								{/* Arrival Time Input */}
								<TableCell align='center'>
									<TextField
										required
										size='small'
										defaultValue={process.arrivalTime}
										onChange={e => arrivalTimeUpdate(e, i)}
										inputProps={{
											style: { textAlign: 'center' },
										}}
									/>
								</TableCell>

								{/* Burst Time Input */}
								<TableCell align='center'>
									<TextField
										required
										size='small'
										defaultValue={process.burstTime}
										onChange={e => burstTimeUpdate(e, i)}
										inputProps={{
											style: { textAlign: 'center' },
										}}
									/>
								</TableCell>

								{/* Completion Time Cell */}
								<TableCell align='center'>
									{process.completionTime}
								</TableCell>

								{/* Turnaround Time Cell */}
								<TableCell align='center'>
									{process.turnAroundTime}
								</TableCell>

								{/* Waiting Time Cell */}
								<TableCell align='center'>
									{process.waitingTime}
								</TableCell>

								{/* Response Time Cell */}
								<TableCell align='center'>
									{process.completionTime}
								</TableCell>

								{/* Delete Row Button */}
								<TableCell align='center'>
									<IconButton
										onClick={e => deleteProcess(e, i)}
									>
										<RemoveCircleOutlineRounded color='error' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box>
				<Button
					onClick={addProcess}
					variant='contained'
					sx={{ m: '20px' }}
				>
					ADD PROCESS
				</Button>
				<Button
					variant='contained'
					onClick={calculateProcess}
					sx={{ m: '20px' }}
				>
					CALCULATE
				</Button>
			</Box>
		</Box>
	);
};

export default ProcessTable;
