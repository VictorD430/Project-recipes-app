export const getMealsAPI = async (endpoint) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
};

export const getDrinksAPI = async (endpoint) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
};
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
