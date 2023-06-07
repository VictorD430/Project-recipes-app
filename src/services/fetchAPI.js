export const getMealsAPI = async (endpoint) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(URL);
  console.log(URL);
  const data = await response.json();
  return data;
};

export const getDrinksAPI = async (endpoint) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
