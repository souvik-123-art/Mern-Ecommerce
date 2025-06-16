import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/help-center" exact={true} element={<Home/>}/>
        <Route path="/" exact={true} element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
