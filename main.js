#!/usr/bin/env node

// fetch()と.json()は非同期処理でPromiseが戻り値であることを知らなかった。だから、fetchとjsonの後でthenを使わないといけないんだ
const getRecipes = () => {
  return new Promise((resolve, reject) => {
    const url = "http://localhost:3000/recipes";
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  }, 1000);
};

const searchedRecipes = () => {
  const inputElement = document.querySelector(".recipe-name");
  const searchButton = document.querySelector(".search-recipe");
  const result = document.querySelector(".result_recipe");

  searchButton.addEventListener("click", async () => {
    const input = inputElement.value;
    getRecipes()
      .then((recipes) => {
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
