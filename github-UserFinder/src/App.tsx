import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import GithubUserFinder from "./component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GithubUserFinder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
