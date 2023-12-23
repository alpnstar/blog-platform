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
                    <Route path={location.pathname + '/'} element={<About/>}/>
                    <Route exact path={location.pathname + '/Posts'} element={<Posts/>}/>
                    <Route exact path={location.pathname + '/Posts/:id'} element={<PostIdPage/>}/>
                    <Route path="/*" element={<Error/>}/>
                </Routes>
        </div>
    )
}
export default App;