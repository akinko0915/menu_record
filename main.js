#!/usr/bin/env node

// 最後の返り値が変数なのはおかしい。Promiseを返さないといけないから。
const getRecipes = () => {
  const url = "http://localhost:3000/recipes";
  return new Promise((resolve) => {
    const response = fetch(url);
    const recipes = response.json();
    resolve();
    return recipes;
  });
};

const searchedRecipes = () => {
  const inputElement = document.querySelector(".recipe-name");
  const searchButton = document.querySelector(".search-recipe");
  const result = document.querySelector(".result_recipe");

  searchButton.addEventListener("click", async () => {
    getRecipes()
      .then(() => {
        const input = inputElement.value;
        const matches = recipes.filter((recipe) => recipe.name.includes(input));

        matches.forEach((recipe) => {
          const div = document.createElement("div");
          result.innerHTML = `<a href="${recipe.url}" target="_blank">${recipe.name}</a>`;
          result.appendChild(div);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

document.addEventListener("DOMContentLoaded", searchedRecipes);
