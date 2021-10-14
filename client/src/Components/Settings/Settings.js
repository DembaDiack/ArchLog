import React, { useEffect,useState } from "react";
import Auth from "../../Auth/Auth";
import Register from "./Register";
import Users from "./Users";

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
        Votre Niveau {state.level}
        {
            state.level >= 3 ? [<Register/> , <Users/>] : null

        }
    </div>
    )
}

export default Settings;