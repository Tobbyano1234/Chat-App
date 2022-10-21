import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mainAxios } from './Axios';

const Logout = () => {
    // contentClass("")
    const nav = useNavigate();

    const handleLogout = async () => {
        await mainAxios.post("users/logout");
        localStorage.clear();
        nav("/")

    }

    useEffect(() => {
        handleLogout()
    }, [])

    return;
}




export default Logout;
