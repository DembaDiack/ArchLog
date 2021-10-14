import React,{useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import Articles from "./Articles";

const Home = ()=>{

    let [query,setQuery] = useState("");
    useEffect(()=>{
        console.log(query);
    },[query]);
    return(
        <div>
            <SearchBar query={query} setQuery={setQuery}/>
            <Articles query={query} setQuery={setQuery} />
        </div>
    )
}
export default Home;