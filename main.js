#!/usr/bin/env node

async function getRecipes() {
  const url = "http://localhost:3000/recipes";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.log(error.message);
  }
}

const searchedRecipes = () => {
  const inputIngredient = document.querySelector(".ingredient");
  const inputCategory = document.querySelector(".category");
  const inputCuisine = document.querySelector(".cuisine");
  const searchButton = document.querySelector(".search-recipe");
  const result = document.querySelector(".result_recipe");

  searchButton.addEventListener("click", async () => {
    const input_ingredient = inputIngredient.value;
    const input_category = inputCategory.value;
    const input_cuisine = inputCuisine.value;
    const recipes = await getRecipes();

    let matches = recipes;
    if (input_ingredient) {
      matches = matches.filter((recipe) =>
        recipe.ingredients.find((ingredient) => ingredient === input_ingredient)
      );
    }
    if (input_category) {
      matches = matches.filter((recipe) => recipe.category === input_category);
    }
    if (input_cuisine) {
      matches = matches.filter((recipe) => recipe.cuisine === input_cuisine);
    }
    console.log(matches);

    if (matches.length != 0) {
      let htmlContent = "";
      matches.forEach((recipe) => {
        htmlContent += `<div><a href="${recipe.url}" target="_blank">${recipe.name}</a></div>`;
      });
      result.innerHTML = htmlContent;
    } else {
      const div = document.createElement("div");
      result.innerHTML = "該当するレシピがありませんでした";
      result.appendChild(div);
    }
  });
};

document.addEventListener("DOMContentLoaded", searchedRecipes);
