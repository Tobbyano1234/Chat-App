import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {
    let classToUse = ""
    const token = localStorage.getItem("tokenStore")

    if (token) {
        classToUse = 'content-wrapper';
    }
    return (
        token ? <div className={classToUse} id="content-wrapper"><Outlet /></div> : <Navigate to='/login' />
    )
}