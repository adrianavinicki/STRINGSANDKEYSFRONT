import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="stringsandkeys.us.auth0.com"
    clientId="lHsq06br7Wha1AGGKCGxag3NlDOijr2L"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://stringsandkeys.us.auth0.com/api/v2/",
      scope: "openid profile email"
    }}
  >
    <React.StrictMode>
      <ChakraProvider >
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </React.StrictMode>
  </Auth0Provider>
);
