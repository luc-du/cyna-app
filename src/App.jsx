import React from "react";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header />
      <main className="content flex-grow">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
