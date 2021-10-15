import React,{useEffect,useState} from "react";
import Auth from "../Auth/Auth";
import axios from "axios";
import Categorie from "./NavBar/Categorie";

const NavBar = ()=>{

    const auth = new Auth();
    const initialState = {
        Categorie : []
    }
    let [state,setState] = useState(initialState);

    useEffect(()=>{
        axios.get("http://localhost:4000/categorie/all")
        .then(result => {  
            const tab = []; 
            result.data.forEach(cat => {
                tab.push(<Categorie Categorie={cat.nom}/>)
            })
            setState({
                ...state,
                Categorie : tab
            })
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    return(
        <nav className="navbar navbar-light navbar-expand bg-light navigation-clean">
            <div className="container">
                <a className="navbar-brand" href="/">
                ESP Times
                </a>
                <ul class="navbar-nav mr-auto">
                    {state.Categorie}
                </ul>
                
                
                <button data-bs-toggle="collapse" data-bs-target="#navcol-1" className="navbar-toggler" />
                {
                    auth.isConnected() ? <div className="collapse navbar-collapse" id="navcol-1">
                    <a href="/logout" className="btn btn-primary ms-auto mr-5" role="button" onClick={(e)=>auth.disconnect()} style={{ marginRight: 18 }}>Log out</a>
                </div>   : <div className="collapse navbar-collapse" id="navcol-1">
                    <a className="btn btn-primary ms-auto" role="button" href="/login" style={{ marginRight: 18 }}>Sign In</a>
                </div>
                }
                <a className="btn btn-primary ms-auto mr-5" role="button" href="/edit/article" style={{ background: 'var(--bs-gray-600)' }}>Ecrire</a>
                <a className="btn btn-primary ms-auto" role="button" href="/settings" style={{ background: 'var(--bs-gray-600)' }}>Settings</a>
            </div>
        </nav>

    )
}

export default NavBar;