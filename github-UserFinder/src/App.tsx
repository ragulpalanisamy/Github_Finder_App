import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import GithubUserFinder from "./components";
import Slack from "./components/Integration/Slack";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GithubUserFinder />} />
        <Route path="/slack" element={<Slack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
