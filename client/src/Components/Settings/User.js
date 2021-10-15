import React,{useState,useEffect} from "react";
import Token from "./Token";
import Auth from "../../Auth/Auth";
import axios from "axios";
const User = (props)=>{
    const auth = new Auth();
    const initialState = {
        tokens : []
    }

    let [state,setState] = useState(initialState);

    const loadTokens = async ()=>{
        const token = await auth.getToken();
        axios.post("http://localhost:4000/token/all/email",{
            token : token,
            email : props.email
        })
        .then(result => {
            console.log(result,props.email);
            const tokens = [];
            result.data.forEach(token => {
                tokens.push(<Token id={token._id} loadTokens={loadTokens} key={token.token} token={token.token} expiration={token.expiration}/>)
            });
            setState({
                ...state,
                tokens : tokens
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    useEffect(async ()=>{
        loadTokens();
    },[]);
    const generateToken = async ()=>{
        axios.post("http://localhost:4000/token/create",{
            email : props.email,
            token : await auth.getToken()
        })
        .then(result => {
            loadTokens();
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const deleteUser = async ()=>{
        axios.post("http://localhost:4000/user/delete",{
            email : props.email,
            token : auth.getEmail()
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{props.email}</h4>
                <h6 className="text-muted card-subtitle mb-2">
                    {props.level}
                    -
                    {props.signUpDate}
                </h6>
                <p>
                    <ul>
                        {state.tokens}
                    </ul>
                </p>
                <a className="card-link" href="#">Modifier</a>
                <a className="card-link" onClick={generateToken}>Generate Token</a>
                <a className="card-link" onClick={deleteUser}>Supprimer</a>
            </div>
        </div>
    )

}

export default User;