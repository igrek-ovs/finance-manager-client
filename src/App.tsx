import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SingInForm from "./components/auth/SingInForm";
import SingUpForm from "./components/auth/SingUpForm";
import AboutProjectForm from "./components/AboutProjectForm";
import {MyGroupsForm} from "./components/MyGroupsForm";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme";
import Routing from "./routes/Routing";
import GroupMainForm from "./components/GroupMainForm";
import CategoriesForm from "./components/CategoriesForm";
function App() {
  return (
  <div>

    <ThemeProvider theme={theme}>

    <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
      <Routing />
    </ThemeProvider>
  </div>
  );
}

export default App;
