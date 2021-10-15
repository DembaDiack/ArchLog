import React,{useEffect,useState} from "react";
import axios from "axios";
import Auth from "../../Auth/Auth";

const Categorie = ()=>{
    const auth = new Auth();
    const initialState = {
        Categorie : ""
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

    const createCat = async ()=>{
        axios.post("http://localhost:4000/categorie/create",{
            nom : state.Categorie,
            token : await auth.getToken()
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="container">
            creer une categorie
            <br/>
            <input onInput={onInput} type="text" name="Categorie" placeholder="Categorie" style={{ marginBottom: 10, paddingLeft: 10 }} />
            <button onClick={createCat} type="button" class="btn btn-dark ml-5">Create Categorie</button>
        </div>
    )

}

export default Categorie;