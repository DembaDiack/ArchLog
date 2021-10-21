import React,{useState,useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Auth from "../Auth/Auth";

const Edit = ()=>{
    const auth = new Auth();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    
    const initialState = {
        categories : [],
        contenu : "",
        titre : "",
        categorie : null,
        originalArticle : null
    };
    let [state,setState] = useState(initialState);
    let [categories,setCategories] = useState([]);
    const onInput = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        });
    };
    useEffect(()=>{
        console.log(id);
        axios.get(`http://localhost:4000/article/${id}`)
        .then(result => {
            console.log(result);
            setState({
                ...state,
                titre : result.data.Titre,
                contenu : result.data.Contenu,
                categorie : result.data.Categorie.nom,
                originalArticle : result.data
            });
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        axios.get("http://localhost:4000/categorie/all")
        .then(result => {
            const arr = [];
            result.data.forEach(cat => {
                arr.push(<option value={`${cat.nom}`}>{cat.nom}</option>);
            })
            setCategories(arr);
        })
        .catch(err =>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        console.log(state);
    },[state])

    const editArticle = async (event) => {
        let modifiedArticle = state.originalArticle;
        modifiedArticle.Titre = state.titre;
        modifiedArticle.Contenu = state.contenu;
        axios.get(`http://localhost:4000/categorie/${state.categorie}`)
        .then(async (result) => {
            modifiedArticle.Categorie = result.data;
            const token = await auth.getToken();
            axios.post("http://localhost:4000/article/edit",{
                article : modifiedArticle,
                token : token
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
            console.log(modifiedArticle);
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
                <option value="" default >{state.categorie ? state.categorie : "Categorie"}</option>
                {categories}
            </select>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Content</label>
                <textarea defaultValue={state.contenu} onInput={onInput} name="contenu" class="form-control" id="exampleFormControlTextarea1" rows="3">
                </textarea>
            </div>
            <button onClick={editArticle} type="button" style={{width:"100%"}}  class="mt-5 btn btn-dark">Save</button>
        </div>
    )
}

export default Edit;