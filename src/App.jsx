import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
