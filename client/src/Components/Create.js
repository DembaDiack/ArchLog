import React,{useState,useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Auth from "../Auth/Auth";

const Create = ()=>{
    const auth = new Auth();
    const initialState = {
        categories : [],
        contenu : "",
        titre : "",
        categorie : null
    };
    let [state,setState] = useState(initialState);

    const onInput = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        });
    };

    useEffect(()=>{
        axios.get("http://localhost:4000/categorie/all")
        .then(result => {
            const arr = [];
            result.data.forEach(cat => {
                arr.push(<option value={`${cat.nom}`}>{cat.nom}</option>);
            })
            setState({
                ...state,
                categories : arr
            });
        })
        .catch(err =>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        console.log(state);
    },[state]);

    const createArt = async ()=>{
        axios.post("http://localhost:4000/article/create",{
            ...state,
            token : await auth.getToken()
        })
        .then(result => {
            console.log(result);
            window.alert(result.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="container">
            <div className="input-group input-group-sm mb-3 mt-5">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">title</span>
                </div>
                <input value={state.titre} name="titre" onInput={onInput} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <select onChange={onInput} name="categorie" id="Titre">
                <option value="" default >Categorie</option>
                {state.categories}
            </select>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Content</label>
                <textarea onInput={onInput} name="contenu" class="form-control" id="exampleFormControlTextarea1" rows="3">
                    {state.contenu}
                </textarea>
            </div>
            <button onClick={createArt} type="button" style={{width:"100%"}}  class="mt-5 btn btn-dark">Save</button>
        </div>
    )
}

export default Create;