import React, {useEffect} from "react";
import "./scss/style.scss";
import {Route, Routes, useLocation, useNavigate, useNavigation} from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Error from "./pages/Error";
import PostIdPage from "./pages/PostIdPage";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate('/About');

    useEffect((() => {
        location.pathname === '/' && navigate('/About');
    }))
    return (
        <div>
                <NavBar/>
            <Routes>
                <Route path="/About" element={<About/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/posts/:id" element={<PostIdPage/>}/>
                <Route path="/*" element={<Error/>}/>

            </Routes>

        </div>
    )
}
export default App;