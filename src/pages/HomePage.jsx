import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

function HomePage() {
  // states
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`
      );
      const data = await res.json();
      setRecipes(data.hits);
      console.log(data.hits);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="mx-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="what do you want to cook today ?"
            />
          </label>
        </form>
        <p className="font-bold text-3cl md:text-3xl mt-4">
          Recommended Recipes
        </p>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm  tracking-tight">
          Popular choices
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            (recipes.length !== 0  ? (
              recipes.map(({ recipe }, index) => (
                <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
              ))
            ) : (
              <div className="h-[80vh] flex-col items-center gap-4">
                <img src="/404.svg" className="h-3/4" alt="404 svg" />
              </div>
            ))}

          {loading &&
            [...Array(10)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="flex w-52 flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
