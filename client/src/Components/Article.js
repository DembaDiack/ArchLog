import axios from "axios";
import React from "react";
import "./Css/Article.css";

const Article = (props)=>{

    const deleteArt = (id)=>{
          axios.post("http://localhost:4000/article/delete",{
            id : props.id,
            token : props.token
          })
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          })
    }
    const button = <button class="btn btn-primary" type="button" onClick={()=>{deleteArt(props.id)}}>Supprimer</button>;

    return(
        <a className="col-lg-4 Article" style={{background:"white"}} href={`/article/${props.id}`}>
        <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
          <h3>{props.titre}</h3>
          <p className="lead mb-0">{props.contenue}</p>
          <p className="lead mb-0" style={{marginTop: 8}}>{props.user}</p>
          <p className="lead mb-0" style={{marginTop: 8}}>
            <a href={`/?cat=${props.Categorie}`}>
            {props.Categorie}
            </a>
          </p>
          {
            props.level >= 3 ? button : null
          }

        </div>
      </a>
    )
}


export default Article;