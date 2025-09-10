import Typography from "@mui/material/Typography";
import SoulPadCanvas from "./Components/SoulPadCanvas";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" textAlign="center" color="initial" mb={4}>
          Demo of SoulPad Canvas
        </Typography>
      </header>
      <SoulPadCanvas />
    </div>
  );
}

export default App;
