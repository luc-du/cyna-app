import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { GlobalToastProvider } from "./components/GlobalToastProvider.jsx";
import "./index.css";
import store from "./redux/store/Store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <Router>
          <GlobalToastProvider>
            <App />
          </GlobalToastProvider>
        </Router>
      </Provider>
    </Elements>
  </StrictMode>
);
