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
    
    let [query,setQuery] = useState("");
    useEffect(()=>{
        console.log(query);
    },[query]);

    return(
    <div>
        <SearchBar query={query} setQuery={setQuery}/>
        <Articles Categorie={cat} url={`http://localhost:4000/article/categorie/${cat}/`} query={query} setQuery={setQuery}/>
    </div>
    )
}

export default Categorie;