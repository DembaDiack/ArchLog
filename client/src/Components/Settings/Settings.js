import React, { useEffect,useState } from "react";
import Auth from "../../Auth/Auth";
import Register from "./Register";
import Users from "./Users";
import Categorie from "./Categorie";
import "../Css/Settings.css";
const Settings = ()=> {

    const auth = new Auth();
    const initialState = {
        level : 1
    }
    let [state,setState] = useState(initialState);

    useEffect(()=>{
        auth.getUser(auth.getEmail())
        .then(result => {
            setState({
                ...state,
                level : result[0].level
            })
        })
        .catch(err => {
            console.log(err);
        })
        
    },[]);


    return(
    <div>
        <p class="text-center mt-5 mb-5" style={{fontSize
             : 22}}>Votre Niveau : {state.level}</p>
        {
            state.level >= 3 ? <span><Register/> <hr/></span> : null
            
        }
        {
            state.level >= 2 ? <span><Categorie/> <hr/></span> : null
        }
        {
            state.level >= 3 ? <span><Users/> <hr/></span> : null
        }
        
    </div>
    )
}

export default Settings;