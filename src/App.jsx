import React from "react";
import "./scss/style.scss";
import {Route, Routes, useLocation} from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Error from "./pages/Error";
import PostIdPage from "./pages/PostIdPage";

const App = () => {
    const location = useLocation();
    console.log(location)
    return (
        <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<About/>}/>
                    <Route exact path="/posts" element={<Posts/>}/>
                    <Route exact path="/posts/:id" element={<PostIdPage/>}/>
                    <Route path="/*" element={<Error/>}/>
                </Routes>
        </div>
    )
}
export default App;