import DoneAll from "@mui/icons-material/DoneAll";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export function Navbar() {
  return (
    <AppBar position="static" variant="elevation">
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit" component="div">
          Recipe Substitutions
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="save all my substitutions"
            color="inherit"
          >
            <DoneAll />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
