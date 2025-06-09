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
  const inputElement = document.querySelector(".recipe-name");
  const searchButton = document.querySelector(".search-recipe");
  const result = document.querySelector(".result_recipe");

  searchButton.addEventListener("click", async () => {
    const input = inputElement.value;
    const recipes = await getRecipes();
    const matches = recipes.filter((recipe) => recipe.name.includes(input));
    if (matches.length == 0) {
      const div = document.createElement("div");
      result.innerHTML = "該当するレシピがありませんでした";
      result.appendChild(div);
    } else {
      matches.forEach((recipe) => {
        const div = document.createElement("div");
        result.innerHTML = `<a href="${recipe.url}" target="_blank">${recipe.name}</a>`;
        result.appendChild(div);
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", searchedRecipes);
