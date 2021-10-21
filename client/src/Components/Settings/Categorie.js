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
        if(state.Categorie.length < 2)
        {
            window.alert("la categorie doit avoir plus que 2 lettres!");
            return;
        }
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
        <div className="container text-center">
            <p class="text-center" style={{fontSize
             : 18}}>Gestion Des Categories</p>
            <br/>
            <input onInput={onInput} type="text" name="Categorie" placeholder="Categorie" style={{ marginBottom: 10, paddingLeft: 10 }} />
            <br/>
            <button onClick={createCat} type="button" class="btn btn-dark ml-5">Create Categorie</button>
        </div>
    )

}

export default Categorie;