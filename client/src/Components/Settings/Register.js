import {React,useEffect,useState} from "react";
import axios from "axios";
const Register = ()=>{
    const masterToken = "194be39923a6074ca705086f2f910a24";

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
            creer des uttilisateurs


            <div className="container d-flex flex-column justify-content-center">
            <input onInput={onInput} type="text" name="email" placeholder="Email" style={{ marginBottom: 10, paddingLeft: 10 }} />
            <input onInput={onInput} type="password" name="password" className="d-flex align-items-center" placeholder="Password" style={{ marginBottom: 10, paddingLeft: 10 }} />
                <form action="/action_page.php">
                    <label htmlFor="Niveau">Niveau</label>
                    <select onChange={onInput} name="level" id="level">
                        <option value={2}>Editeur</option>
                        <option value={3}>Administrateur</option>
                    </select>
                </form>


            <button onClick={SignUp} className="btn btn-primary" type="button">creer</button>
        </div>
        </div>
    )
}

export default Register;