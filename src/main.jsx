import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { GlobalToastProvider } from "./components/GlobalToastProvider.jsx";
import "./index.css";
import store from "./redux/store/Store"; // ici

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <GlobalToastProvider>
          <App />
        </GlobalToastProvider>
      </Router>
    </Provider>
  </StrictMode>
);
