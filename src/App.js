import React, { useEffect,useState } from 'react';
import './App.css';
import Recipe from "./Recipe";

const App = () => {
const APP_ID = 'b3bf42f3';
const APP_KEY = '6b800dbde307b041dfa3865bd330d199';

const [recipes,setRecipes] = useState([]);
const [search,setSearch] = useState("");
const [query,setQuery] = useState()

useEffect(  () => {
getRecipes();
},[query] );

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);

}


  return(
    <div className="App" >
      <form className="search-form" onSubmit={getSearch} >
        <input 
        className="search-bar"  
        type="text" 
        value={search} 
        onChange={updateSearch} />
        <button className="search-button" type="submit" > Search </button>
      </form>
      {recipes.map(recipe  =>(
        <Recipe 
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image} />
      ) )}
      
 
    </div>
  )
}

export default App;
