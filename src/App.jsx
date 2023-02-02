import { useState } from 'react';
// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// MUI
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// local files
import AppLayout from './layout/AppLayout';

const App = () => {
	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppLayout />
		</ThemeProvider>
	);
};

export default App;
