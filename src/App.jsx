import { useState } from 'react';
// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// MUI
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// local files
import ProcessTable from './ProcessTable';

const App = () => {
	const [themeMode, setThemeMode] = useState('dark');

	const theme = createTheme({
		palette: {
			mode: themeMode,
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box>
				<ProcessTable />
			</Box>
		</ThemeProvider>
	);
};

export default App;
