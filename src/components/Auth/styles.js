import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
    const theme = useTheme(); // Manually get the theme
    return {
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
        paper: {
            //   marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            //   padding: theme.spacing(2),
        },
    };
});

export default useStyles;
