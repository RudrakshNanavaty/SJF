import { useState } from 'react';
import ProcessTable from '../ProcessTable';
import { Grid, Button } from '@mui/material';

const AppLayout = () => {
	const createData = () => {
		// generate a random PID between 0 - 100
		const pid = Math.floor(Math.random() * (999 - 101 + 1)) + 101;
		return {
			pid,
			arrivalTime: undefined,
			burstTime: undefined,
			completionTime: undefined,
			turnAroundTime: undefined,
			waitingTime: undefined,
			responseTime: undefined,
		};
	};

	// array of objects containing process data
	const [processes, setProcesses] = useState([createData()]);

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
				container
				sx={{
					width: '100%',
					height: '75vh',
					overflow: 'scroll',
					'&::-webkit-scrollbar': { display: 'none' },
				}}
			>
				<ProcessTable
					processes={processes}
					setProcesses={setProcesses}
				/>
			</Grid>
		</Grid>
	);
};

export default AppLayout;
