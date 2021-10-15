import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Articles from "./Articles";
import {useParams} from "react-router-dom";
const Categorie = (props) => {
    let cat = useParams().categorie;
    const initialState = {
        articles : []
    }
    let [state,setState] = useState();
    useEffect(()=>{
        console.log(cat);
    },[]);
    
    return(
    <div>
        <SearchBar/>
        <Articles Categorie={cat} url={`http://localhost:4000/article/categorie/${cat}/`}/>
    </div>
    )
}

export default Categorie;