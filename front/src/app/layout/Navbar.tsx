import DoneAll from "@mui/icons-material/DoneAll";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

export const Navbar: React.FC<{ onDoneAll: () => void }> = (props) => {
  const [timeRemaining, setTimeRemaning] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setTimeRemaning(
        `Selections Expire: ${moment(moment().add(600, "seconds")).fromNow()}`
      );
    }, 3000);
  }, []);

  return (
    <AppBar position="fixed" variant="elevation">
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit" component="div">
          Recipe Substitutions
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          <Typography variant="body2" color="inherit" component="div">
            {timeRemaining}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="save all my substitutions"
            color="inherit"
            onClick={props.onDoneAll}
          >
            <DoneAll />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
