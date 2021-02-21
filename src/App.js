import React, {useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe'

function App() {

  const APP_ID = '40755043'
  const APP_KEY = 'e2cae0d6124bb9f8eeebe4a17bc1e188'

  const [recipes,setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query,setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes()
  },[query])

  const handleSearchClick = (e) =>{
    setSearch(e.target.value)
  }

  const getSearch = (e) => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" 
        value={search}
        onChange={handleSearchClick}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=> (
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
