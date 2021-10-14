import axios from "axios";
import React, { useEffect, useState } from "react";
import Auth from "../Auth/Auth";
import {useHistory} from "react-router-dom";

const Connect = ()=>{
    const auth = new Auth();
    const history = useHistory();
    const initialState = {
        email : "",
        password : ""
    }
    let [state,setState] = useState(initialState);

    const onInput = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        });
    };

    useEffect(()=>{
        if(auth.isConnected())
        {
            history.push("/");
            return;
        }
        console.log(state);
    },[state]);
    
    const Connect = ()=> {
        auth.connect(state.email,state.password)
        .then(result => {
            if(result)
            {
                history.push("/");
            }
        })
    }
    return(
        <div className="container d-flex flex-column justify-content-center">
            <input onInput={onInput} type="text" name="email" placeholder="Email" style={{ marginBottom: 10, paddingLeft: 10 }} />
            <input onInput={onInput} type="password" name="password" className="d-flex align-items-center" placeholder="Password" style={{ marginBottom: 10, paddingLeft: 10 }} />
            <button onClick={Connect} className="btn btn-primary" type="button">Connect</button>
        </div>
)
}

export default Connect;