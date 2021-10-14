import React,{useEffect} from "react";
import Auth from "../../Auth/Auth";
import axios from "axios";

const Users = (props) => {
    const auth = new Auth();
    useEffect(async ()=>{
        const token = await auth.getToken();
        console.log(token);
        axios.post("http://localhost:4000/user/all",{
            token : "dfsfdsff"
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return(
        <div>
            users
        </div>
    )
}
export default Users;