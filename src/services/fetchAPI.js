export const getMealsAPI = async (endpoint) => {
  const URL = `www.themealdb.com/api/json/v1/1/${endpoint}`;
  try {
    const response = await fetch(URL);
    // return response.json();
    // const data = JSON.parse(JSON.stringify(response));
    const data = JSON.stringify(response);
    console.log(data);
    /* console.log(data, 'data'); */
    return data;
  } catch (e) {
    console.log('Oi eu sou o nosso erro!', e.message);
  }
};

export const getDrinksAPI = async (endpoint) => {
  const URL = `www.thecocktaildb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(URL);
  console.log(response);
  return response.json();
/*     return data; */
};
