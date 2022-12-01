import { useEffect } from "react";
import Theme from "Styles/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./Home";
import { useAppDispatch } from "Hooks/Store";
import { LoadStartupData } from "Redux/App/Actions/Startup";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!localStorage.getItem("startupData")) dispatch(LoadStartupData());
  }, [dispatch]);
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
