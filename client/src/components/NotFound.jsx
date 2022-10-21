const NotFound = () => {
    let show = false;
    if (localStorage.getItem("tokenStore") !== null) {
        show = true;
    }
    return (
        show &&
        <h1> Not found </h1>
    )
}

export default NotFound