import React,{useState,useEffect} from "react";
import axios from "axios";
import Auth from "../Auth/Auth";
import {useParams} from "react-router-dom";
import {AES} from "crypto-js";

const UserEdit = ()=>{
    const auth = new Auth();
    const email = useParams().email;
    const initialState = {
        email : null,
        password : null
    }
    const [state,setState] = useState(initialState);

    useEffect(async ()=>{

        let user = await auth.getUser(email);
        setState(user[0]);
    },[]);

    const updateUser = (event) => {
        let password = AES.encrypt(state.password,"ilikecookies");
        setState({
            ...state,
            level : Number.parseInt(state.level),
            password : password
        });
        axios.post("/user/edit",{
            user_data : {
                ...state,
            "find" : email
            }
        })
        .then(result => {
            console.log(result);
            window.alert("uttilisateur modifie!");
        })
        .catch(err => {
            console.log(err);
        })

    }
    const onInput = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        })
    }
    useEffect(()=>{
        console.log(state);
    },[state])
    return(
        <div classname="vmstack">
            <div className="d-flex flex-row">
                <div className="p-2"><div classname="form-group row">
                    <label htmlfor="staticEmail" placeholder="email" classname="col-sm-2 col-form-label">Email</label>
                    <div classname="col-sm-10">
                        <input value={state.email} name="email" onInput={onInput} type="text"  classname="form-control-plaintext" id="staticEmail" />
                    </div>
                </div></div>
                <div className="p-2"><div classname="form-group row">
                    <label htmlfor="inputPassword" classname="col-sm-2 col-form-label">Password</label>
                    <div classname="col-sm-10">
                        <input onInput={onInput} placeholder="newpassword..vide = meme" name="password" type="password" classname="form-control" id="inputPassword" placeholder="Password" />
                    </div></div>
                    <div className="p-2">
                    <select value={state.level} onChange={onInput} name="level" id="Niveau" onChanges={onInput}>
                    <option value={1} default >1</option>
                    <option value={2} default >2</option>
                    <option value={3} default >3</option>
                </select>
                <div>
                <button onClick={updateUser} type="button" class="btn btn-outline-dark m-5">Changer</button>
                </div>
                    </div>
                    
                </div>
            </div>
        </div>


    )
}
export default UserEdit;