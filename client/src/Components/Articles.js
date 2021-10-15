import React,{useState,useEffect} from "react";
import Article from "./Article";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth/Auth";

const Articles = (props)=>{
    const auth = new Auth();
    const token = auth.getToken();
    const location = useLocation();
    
    let [state,setState] = useState([]);

    useEffect(()=>{

    },[])

    useEffect(()=>{
        console.log("running");
        axios.get(`http://localhost:4000/article/all`)
        .then(result => {
            let articles_arr = result.data;
            const arr_tab = [];
            articles_arr.forEach(art => {
              console.log(art);
              arr_tab.push(<Article token={token} level={auth.userLevel} categorie={art.Categorie} id={art._id} key={art._id} titre={art.Titre} contenue={art.Contenu} user={art.Auteur.email} />)
            });
            setState(arr_tab);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    

    return(
      <section className="text-center bg-light features-icons mt-5">
        <div className="container">
          <div className="row p-5">
            {state}
          </div>
        </div>
      </section>

    )
}




export default Articles;