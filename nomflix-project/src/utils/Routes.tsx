import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../routes/Home";
import Tv from "../routes/Tv";
import Search from "../routes/Search";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/tv" element={<Tv/>}></Route>
                <Route path="/search" element={<Search/>}></Route>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router