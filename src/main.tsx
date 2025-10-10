import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const container = document.getElementById("root")!;
const persistor = persistStore(store);
const root = createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
