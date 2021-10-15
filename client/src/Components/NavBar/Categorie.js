import React from "react";

const Categorie = (props)=>{

    return(
        <li class="nav-item active">
            <a class="nav-link" href={`/categorie/${props.Categorie}`}>{props.Categorie} <span class="sr-only"></span></a>
        </li>
    )
}

export default Categorie;