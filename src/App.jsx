import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="app-container">
      <main className="content">
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
