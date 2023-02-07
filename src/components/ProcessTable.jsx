// MUI
import { RemoveCircleOutlineRounded } from '@mui/icons-material';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	IconButton,
	Paper,
} from '@mui/material';

const ProcessTable = props => {
	const { processes, setProcesses, errorText, setErrorText } = props;

	const arrivalTimeUpdate = (event, index) => {
		const t = processes;
		t[index]['arrivalTime'] = event.target.value;
		setProcesses(t);
	};

	const burstTimeUpdate = (event, index) => {
		const t = processes;
		t[index]['burstTime'] = event.target.value;
		setProcesses(t);
	};

	const deleteProcess = (event, index) => {
		const e = [
			...errorText.slice(0, index),
			...errorText.slice(index + 1, errorText.length),
		];

		const t = [
			...processes.slice(0, index),
			...processes.slice(index + 1, processes.length),
		];

		setErrorText(e);
		setProcesses(t);
	};

	return (
		<TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
			<Table
				sx={{
					borderRadius: '12px',
					backgroundColor: 'grey.900',
				}}
			>
				{/* Table Header */}
				<TableHead>
					<TableRow>
						<TableCell align='center'>PID</TableCell>

						<TableCell align='center'>Arrival Time (AT)</TableCell>
						<TableCell align='center'>Burst Time (BT)</TableCell>

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
									size='small'
									defaultValue={process.arrivalTime}
									onChange={e => arrivalTimeUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={errorText[i][0] !== ''}
									helperText={errorText[i][0]}
								/>
							</TableCell>

							{/* Burst Time Input */}
							<TableCell align='center'>
								<TextField
									size='small'
									defaultValue={process.burstTime}
									onChange={e => burstTimeUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={errorText[i][1] !== ''}
									helperText={errorText[i][1]}
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
								<IconButton onClick={e => deleteProcess(e, i)}>
									<RemoveCircleOutlineRounded color='error' />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProcessTable;
