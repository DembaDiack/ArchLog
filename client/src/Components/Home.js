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
            <Articles url="http://localhost:4000/article/page/" query={query} setQuery={setQuery} />
        </div>
    )
}
export default Home;