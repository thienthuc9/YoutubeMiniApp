import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider từ React-Redux
import { store } from "./redux/store.ts"; // Import store đã tạo
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}> {/* Bọc App bằng Provider */}
      <App />
    </Provider>
  </StrictMode>
)