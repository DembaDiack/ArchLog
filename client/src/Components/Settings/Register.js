import {React,useEffect,useState} from "react";
import axios from "axios";
const Register = ()=>{
    const masterToken = "09b30d7f548a12e055c587b9233d4738";

    const initialState = {
        email : "",
        password : "",
        level : 2
    }
    let [state,setState] = useState(initialState);

    useEffect(()=>{
        console.log(state);
    },[state]);
    const onInput = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        });
    };
    const SignUp = () => {
        console.log(state);
        axios.post("http://localhost:4000/user/create",{
            email : state.email,
            password : state.password,
            level : state.level,
            token : masterToken
        })
        .then(result => {
            window.alert(result.data);
        })
        .catch(err => {
        })
    }
    return(
        <div>
            <p class="text-center" style={{fontSize
             : 18}}>Creer des uttilisateurs</p>


            <div className="container d-flex flex-column justify-content-center">
            <input onInput={onInput} type="text" name="email" placeholder="Email" style={{ marginBottom: 10, paddingLeft: 10 }} />
            <input onInput={onInput} type="password" name="password" className="d-flex align-items-center" placeholder="Password" style={{ marginBottom: 10, paddingLeft: 10 }} />
                <form action="/action_page.php" className="mb-3">
                    <label htmlFor="Niveau">Niveau</label>
                    <select onChange={onInput} name="level" id="level">
                        <option value={2}>Editeur</option>
                        <option value={3}>Administrateur</option>
                    </select>
                </form>


            <button onClick={SignUp} className="mb-5 btn btn-primary" type="button">creer</button>
        </div>
        </div>
    )
}

export default Register;