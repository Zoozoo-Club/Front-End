import { RouterProvider } from "react-router-dom";
import MainRouter from "./routes/main-router";
import "./App.css";
import CommonPopup from "./components/CommonPopup";

function App() {
  return (
    <>
      <RouterProvider router={MainRouter}></RouterProvider>
      <CommonPopup />
    </>
  );
}

export default App;
