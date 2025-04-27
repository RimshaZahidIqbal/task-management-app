import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5', // Deep Blue (modern look)
            light: '#6573c3',
            dark: '#303f9f',
        },
        secondary: {
            main: '#f50057', // Pink (to balance out blues)
        },
        background: {
            default: '#f7f7f7', // Soft background
            paper: '#fff',
        },
        text: {
            primary: '#333', // Dark primary text
            secondary: '#666', // Secondary text for less important info
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif', // Modern font family
        h1: {
            fontWeight: 600,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 500,
            fontSize: '2rem',
        },
        body1: {
            fontSize: '1rem',
            color: '#333',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Rounded buttons
                    textTransform: 'none', // No uppercase letters
                    padding: '10px 20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)', // Slight hover effect
                    },
                },
            },
        },
    },
});

export default theme;
