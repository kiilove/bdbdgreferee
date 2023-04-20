import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import Scoring from "./pages/Scoring";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ScoreVertical from "./pages/ScoreVertical";
import VerticalRank from "./scoreTable/VerticalRank";
import AdminScore from "./pages/adminTools/AdminScore";
import AdminLobby from "./pages/adminTools/AdminLobby";
import AdminReport from "./pages/adminTools/AdminReport";
import MachineCheck from "./pages/MachineCheck";
import ScoreDemo from "./pages/adminTools/ScoreDemo";
import AdminReportDemo from "./pages/adminTools/AdminReportDemo";
import ScreenReport from "./pages/adminTools/ScreenReport";
import { MachineContextProvider } from "./context/MachineContext";
import MachineSetting from "./pages/adminTools/MachineSetting";
import Home from "./pages/Home";
import ManualRank from "./pages/ManualRank";
import { ManualRankContextProvider } from "./context/ManualRankContext";
import ManualList from "./pages/ManualList";
import { ManualRankScoreContextProvider } from "./context/ManualRankScoreContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <MachineContextProvider>
      <ManualRankContextProvider>
        <ManualRankScoreContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/rankdemo" element={<MachineCheck />} />
              <Route path="/rankingdemo" element={<ScoreDemo />} />
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Home />} />
              <Route path="/manuallist" element={<ManualList />} />
              <Route path="/manualrank" element={<ManualRank />} />
              <Route path="/lobby" element={<Lobby />} />

              <Route path="/scoring" element={<Scoring />} />
              <Route path="/scorevertical" element={<ScoreVertical />} />
              <Route path="/scorevertical2" element={<VerticalRank />} />
              <Route path="/onlyadmin" element={<AdminLobby />} />
              <Route path="/adminscore" element={<AdminScore />} />
              <Route path="/adminreport" element={<AdminReportDemo />} />
              <Route path="/screen" element={<ScreenReport />} />
              <Route path="/machinesetting" element={<MachineSetting />} />
            </Routes>
          </BrowserRouter>
        </ManualRankScoreContextProvider>
      </ManualRankContextProvider>
    </MachineContextProvider>
  );
}

export default App;
