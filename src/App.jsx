import "./scss/style.scss";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar";
import About from "./pages/About";
import Posts from "./pages/Posts";

const App = () => {
    return (
        <div className='app'>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Posts" element={<Posts/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;