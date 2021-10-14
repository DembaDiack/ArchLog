import React,{useState,useEffect} from "react";
import Article from "./Article";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth/Auth";

// const Articles = (props)=>{
//     const auth = new Auth();
//     const token = auth.getToken();
//     const location = useLocation();
//     const initialState = {
//       currentPage : 1
//     }
//     const [state,setState] = useState(initialState);
//     let cat = "";
//     let numOfArticles = 1000;
//     useEffect(()=>{
//       const queryParams = new URLSearchParams(location);
//       const singleValue = queryParams.get("cat");
//       singleValue ? cat = singleValue : cat = "";
//     },[])

//     useEffect(()=>{
//         console.log("running");
//         axios.get(`http://localhost:4000/article/page/${state.currentPage}/?q=${props.query}&c=${cat}`)
//         .then(result => {
//             let articles_arr = result.data;
//             const arr_tab = [];
//             articles_arr.forEach(art => {
//               console.log(art);
//               arr_tab.push(<Article token={token} level={auth.userLevel} categorie={art.Categorie} id={art._id} key={art._id} titre={art.Titre} contenue={art.Contenu} user={art.Auteur.email} />)
//             });
//             setState(arr_tab);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     },[])

//     const inc = ()=>{
//       setState({
//         ...state,
//         currentPage : state.currentPage + 1
//       });
//     }
//     const dec = ()=>{
//       if(state.currentPage == 0 ) return;
//       setState({
//         ...state,
//         currentPage : state.currentPage - 1
//       });
//     }

//     return(
//         <section className="text-center bg-light features-icons mt-5">
//   <div className="container">
//     <div className="row p-5">
//       {state}
//       <button class="btn btn-primary" onClick={dec} type="button">avant</button>
//       <button class="btn btn-primary" onClick={inc} type="button">apres</button>
//     </div>
//   </div>
// </section>

//     )
// }

const Articles = ()=>{
  return(
    <div>
      hello
    </div>
  )
}


export default Articles;