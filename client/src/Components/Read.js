import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

const Read = (props)=> {
    const id = useParams().id;
    let initialState = {
        titre : "",
        auteur : "",
        contenu : ""
    }
    const [state,setState] = useState(initialState);

    useEffect(()=>{
        axios.get(`http://localhost:4000/article/${id}`)
    .then(result => {
        const article = result.data;
        const newState = {
            titre : article.Titre,
            auteur : article.Auteur.email,
            contenu : article.Contenu
        }
        setState(newState);
    })
    .catch(err => {
        console.log(err);
    })
    },[]);
    return(<div>
        <ul>
            <li>{state.titre}</li>
            <li>{state.contenu}</li>
            <li>{state.auteur}</li>
        </ul>
    </div>)

}
export default Read;