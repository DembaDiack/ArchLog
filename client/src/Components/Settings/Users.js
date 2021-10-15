import React,{useEffect,useState} from "react";
import Auth from "../../Auth/Auth";
import axios from "axios";
import User from "./User";

const Users = (props) => {
    const auth = new Auth();
    const initialState = {
        users : []
    }
    let [state,setState] = useState(initialState);
    const loadUsers = async ()=>{
        const token = await auth.getToken();
        console.log(token);
        axios.post("http://localhost:4000/user/all",{
            token : token
        })
        .then(result => {
            console.log(result);
            const users_list = state.users;
            const loggedIn = auth.getEmail();
            result.data.forEach(user => {
                if(user.email != "dembadiack@outlook.com" && user.email != loggedIn)
                {
                    console.log(user);
                    users_list.push(<User loadUsers={()=>{loadUsers()}} key={user._id} email={user.email} level={user.level} signUpDate={user.signUpDate}/>)
                }
                
            });
            setState({
                ...state,
                users : users_list
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    useEffect(async ()=>{
        loadUsers();
    },[])

    return(
        <div className="vstack mt-5">
            {state.users}
        </div>
    )
}
export default Users;