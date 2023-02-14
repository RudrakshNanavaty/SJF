// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// MUI
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// local files
import AppLayout from './layout/AppLayout';
import assets from './assets';

const App = () => {
	return (
		// custom theme
		<ThemeProvider theme={createTheme(assets.theme)}>
			<CssBaseline />

			{/* Background Video */}
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					zIndex: '-1',
					overflow: 'scroll',
					'&::-webkit-scrollbar': { display: 'none' }
				}}
			>
				<video loop autoPlay muted>
					<source src='bgvideo.mp4' type='video/mp4' />
				</video>
			</Box>

			{/* Layout */}
			<AppLayout />
		</ThemeProvider>
	);
};

export default App;
