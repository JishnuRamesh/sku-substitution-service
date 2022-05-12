import DoneAll from "@mui/icons-material/DoneAll";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const countDown = 3;
const countStart = 600;

export const Navbar: React.FC<{ onDoneAll: () => void }> = (props) => {
  const [timeRemaining, setTimeRemaning] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [currentTimeRemaining, setCurrentTimeRemaining] =
    useState<number>(countStart);

  useEffect(() => {
    setTimeout(() => {
      const nextTick = (currentTimeRemaining || countStart) - countDown;
      console.log("NextTick:", nextTick);
      setCurrentTimeRemaining(nextTick);
      setTimeRemaning(
        `Selections Expire: ${moment(
          moment().add(nextTick, "seconds")
        ).fromNow()}`
      );
    }, countDown * 1000);
  });

  const renderSaveIcon = (done: boolean) => {
    if (done) {
      return null;
    }
    return (
      <>
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
            onClick={() => {
              setDone(true);
              props.onDoneAll();
            }}
          >
            <DoneAll />
          </IconButton>
        </Box>
      </>
    );
  };

  return (
    <AppBar position="fixed" variant="elevation">
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit" component="div">
          Recipe Substitutions
        </Typography>
        {renderSaveIcon(done)}
      </Toolbar>
    </AppBar>
  );
};
