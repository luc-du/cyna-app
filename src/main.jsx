import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { GlobalToastProvider } from "./components/GlobalToastProvider.jsx";
import DarkModeInitializer from "./components/ui/DarkModeInitializer.jsx";
import "./index.css";
import store from "./redux/store/Store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <Router>
            <GlobalToastProvider>
              <DarkModeInitializer />
              <App />
            </GlobalToastProvider>
          </Router>
        </Provider>
      </Elements>
    </HelmetProvider>
  </StrictMode>
);
