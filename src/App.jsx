import { useEffect } from "react";
import { useDispatch } from "react-redux"; // pas besoin de Provider ici
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { fetchAllProducts } from "./redux/slice/searchSlice";
import AppRouter from "./routes/AppRouter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header />
      <main className="w-full flex flex-grow items-center m-auto">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
