import Auth from "../Auth/Auth";

const NavBar = ()=>{

    const auth = new Auth();

    return(
        <nav className="navbar navbar-light navbar-expand bg-light navigation-clean">
            <div className="container"><a className="navbar-brand" href="/">
                ESP Times
                </a><button data-bs-toggle="collapse" data-bs-target="#navcol-1" className="navbar-toggler" />
                {
                    auth.isConnected() ? <div className="collapse navbar-collapse" id="navcol-1">
                    <a className="btn btn-primary ms-auto" role="button" onClick={(e)=>auth.disconnect()} style={{ marginRight: 18 }}>Log out</a>
                </div>   : <div className="collapse navbar-collapse" id="navcol-1">
                    <a className="btn btn-primary ms-auto" role="button" href="/login" style={{ marginRight: 18 }}>Sign In</a>
                </div>
                }
                <a className="btn btn-primary ms-auto" role="button" href="/settings" style={{ background: 'var(--bs-gray-600)' }}>Settings</a>
            </div>
        </nav>

    )
}

export default NavBar;