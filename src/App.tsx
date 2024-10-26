import { RouterProvider } from "react-router-dom";
import MainRouter from "./routes/main-router";
import "./App.css";
import CommonPopup from "./components/CommonPopup";
import LoginPopup from "./components/LoginPopup";
import "./index.css";

function App() {
  return (
    <>
      <RouterProvider router={MainRouter}></RouterProvider>
      <CommonPopup />
      <LoginPopup />
    </>
  );
}

export default App;
