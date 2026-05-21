const MEALDB_BASE = 'https://www.themealdb.com/api/json/v1/1';
const DUMMYJSON_BASE = 'https://dummyjson.com';

export async function fetchFoodItems(search = '') {
  const endpoint = search
    ? `${MEALDB_BASE}/search.php?s=${search}`
    : `${MEALDB_BASE}/search.php?s=`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Failed to fetch food items');
  const data = await response.json();
  return (data.meals || []).map(meal => ({
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    tags: meal.strTags,
    source: 'MealDB',
  }));
}

export async function fetchFoodDetail(id) {
  const response = await fetch(`${MEALDB_BASE}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetch food details');
  const data = await response.json();
  if (!data.meals || !data.meals[0]) throw new Error('Food not found');
  const meal = data.meals[0];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ing.trim()}`.trim());
    }
  }
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    tags: meal.strTags,
    ingredients,
    source: 'MealDB',
  };
}

export async function fetchRestaurants() {
  const response = await fetch(`${DUMMYJSON_BASE}/users?limit=20`);
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  const data = await response.json();
  return data.users.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}'s Kitchen`,
    address: `${user.address.address}, ${user.address.city}`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    phone: user.phone,
    email: user.email,
    image: user.image,
    openingHours: '10:00 AM - 10:00 PM',
  }));
}
