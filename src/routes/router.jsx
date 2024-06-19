import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Home} from "../components/dashboard/index.jsx";
import {Products} from "../components/products/index.jsx";
import Login from "../components/auth/Login.jsx";
import MainLayout from "../layout/MainLayout.jsx";

export function Router(){

    const istokenAvailable = (localStorage.getItem('token') || useSelector(state=>state.auth.token));
    const isuserAvailable = (localStorage.getItem('user') || useSelector(state=>state.auth.user));

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={istokenAvailable?<MainLayout children={<Home />}/>:<Navigate to="/login"/>}/>
                <Route path="/login" element={istokenAvailable?<Navigate to="/"/>:<Login />}/>
                <Route path="/products" element={isuserAvailable?<MainLayout children={<Products />}/>:<Navigate to="/login"/>}/>
            </Routes>
        </BrowserRouter>
    )
}