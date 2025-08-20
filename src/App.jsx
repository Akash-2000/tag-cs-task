import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import Routes from "./Routes/routes.jsx";
import Store from "./redux/store.js";

const AppRoutes = () => {
  return useRoutes(Routes);
};

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
