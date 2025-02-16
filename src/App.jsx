import React from "react";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
