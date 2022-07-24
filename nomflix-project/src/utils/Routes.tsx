import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Tv from "../routes/Tv";
import Search from "../routes/Search";
import NavBar from "../components/NavBar";

function Router() {
    return (
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/tv" element={<Tv/>}></Route>
                    <Route path="/search" element={<Search/>}></Route>
                    <Route path="/" element={<Home/>}>
                        <Route path="/movies/:movieId" element={<Home/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
    )
}

export default Router