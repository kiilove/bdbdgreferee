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

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Lobby />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/lobby"
          element={
            <RequireAuth>
              <Lobby />
            </RequireAuth>
          }
        />

        <Route
          path="/scoring"
          element={
            <RequireAuth>
              <Scoring />
            </RequireAuth>
          }
        />
        <Route
          path="/scorevertical"
          element={
            <RequireAuth>
              <ScoreVertical />
            </RequireAuth>
          }
        />
        <Route
          path="/scorevertical2"
          element={
            <RequireAuth>
              <VerticalRank />
            </RequireAuth>
          }
        />
        <Route path="/onlyadmin" element={<AdminLobby />} />
        <Route path="/adminscore" element={<AdminScore />} />
        <Route path="/adminreport" element={<AdminReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
