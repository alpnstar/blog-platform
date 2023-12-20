import "./scss/style.scss";
import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Error from "./pages/Error";

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<About/>}/>
                    <Route path="/Posts" element={<Posts/>}/>
                    <Route path="/Error" element={<Error/>}/>
                    <Route path="/*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;