import React from "react";
const SearchBar = (props)=>{


    const setQuery = (event)=>{
      const value = event.target.value;
      props.setQuery(value);
    }

    return(
        <div className="container mt-5">
  <div className="row">
    <div className="col-xl-9 mx-auto position-relative">
      <h1 className="mb-5" style={{textAlign : "center"}}>Chercher Des Articles par Nom ou Auteur</h1>
    </div>
    <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
      <form>
        <div className="row">
          <div className="col-12 col-md-9 mb-2 mb-md-0" style={{width : "100%"}}>
          <div className="input-group">
  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={setQuery}/>
  <button type="button" className="btn btn-outline-primary">search</button>
</div>

        </div>
        </div>
      </form>
    </div>
  </div>
</div>

    )
}
export default SearchBar;