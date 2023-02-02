// MUI
import { RemoveCircleOutlineRounded } from '@mui/icons-material';
import { TextField, IconButton, Paper } from '@mui/material';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

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

	const deleteProcess = (event, index) => {
		const t = [
			...processes.slice(0, index),
			...processes.slice(index + 1, processes.length),
		];
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

							{/* Arrival Time cell */}
							<TableCell align='center'>
								<TextField
									size='small'
									defaultValue={process.at}
									onChange={e => arrivalTimeUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={process.at === ''}
									helperText='Empty.'
								/>
							</TableCell>

							{/* Burst Time cell */}
							<TableCell align='center'>
								<TextField
									size='small'
									defaultValue={process.bt}
									onChange={e => burstTimeUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={process.bt === ''}
									helperText='Empty.'
								/>
							</TableCell>

							{/* Completion Time Cell */}
							<TableCell align='center'>{process.ct}</TableCell>

							{/* Turnaround Time Cell */}
							<TableCell align='center'>{process.tat}</TableCell>

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
