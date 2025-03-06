import { Provider } from "react-redux";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import store from "./redux/store/Store";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container min-h-screen flex flex-col">
        <Header />
        <main className="w-full flex flex-grow items-center m-auto">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
