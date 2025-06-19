import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="app-container min-h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="w-full flex flex-grow items-center m-auto">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
