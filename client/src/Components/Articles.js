import React,{useState,useEffect} from "react";
import Article from "./Article";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth/Auth";

const Articles = (props)=>{
    const auth = new Auth();
    const token = auth.getToken();
    const location = useLocation();
    const initialState = {
      page : 1,
      articles : [],
      limit : 0
    }
    let [state,setState] = useState(initialState);

    useEffect(()=>{
      let url = "http://localhost:4000/article/counter/";
      if(props.Categorie)
      {
        url = url.concat(props.Categorie);
        console.log(url);
      }
      axios.get(url)
      .then(result => {
        setState({
          ...state,
          limit : Number.parseInt(result.data.count)
        })
      })
      .catch(err => {
        console.log(err);
      })
    },[])

    useEffect(()=>{
        console.log("running");
        const url = props.url + state.page;
        console.log(url);
        axios.get(url)
        .then(result => {
          console.log(result);
            let articles_arr = result.data;
            const arr_tab = state.articles;
            articles_arr.forEach(art => {
              console.log(art);
              arr_tab.push(<Article token={token} level={auth.userLevel} categorie={art.Categorie} id={art._id} key={art._id} titre={art.Titre} contenue={art.Contenu} user={art.Auteur.email} />)
            });
            setState({
              ...state,
              articles : arr_tab
            });
        })
        .catch(err => {
            console.log(err);
        })
    },[state.page])

    const loadMore = ()=>{
      setState({
        ...state,
        page : state.page + 1
      })
    }
    useEffect(()=>{
      console.log(state);
    },[state]);

    return(
      <section className="text-center bg-light features-icons mt-5">
        <div className="container">
          <div className="row p-5">
            {state.articles}
          </div>
          <button type="button" onClick={()=>loadMore()} class="btn btn-dark" disabled={state.articles.length >= state.limit}>Plus</button>
        </div>
      </section>

    )
}




export default Articles;