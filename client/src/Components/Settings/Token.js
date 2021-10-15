import React from "react";
import Auth from "../../Auth/Auth";
import axios from "axios";

const Token = (props) => {
    const auth = new Auth();

    const deleteToken = async ()=>{
        axios.post("http://localhost:4000/token/delete",{
            id : props.id,
            token : await auth.getToken()
        })
        .then(result => {
            console.log(result);
            props.loadTokens();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <li className="mb-3" >
            {props.token} - {props.expiration} -<button onClick={deleteToken} class="btn btn-danger" type="button">delete</button>
        </li>
    )
}
export default Token;