import { Tldraw } from "tldraw";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "tldraw/tldraw.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" textAlign="center" color="initial" mb={4}>
          Demo of SoulPad Canvas
        </Typography>
      </header>
      <Box
        m={10}
        p={2}
        border={1}
        borderColor="grey.500"
        sx={{
          position: "fixed",
          inset: "0",
        }}
      >
        <Tldraw />
      </Box>
    </div>
  );
}

export default App;
