import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    // Make a request to the CocktailDB API
    const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    const result = await axios.get(apiUrl);
  
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = result.data.drinks[0][`strIngredient${i}`];
      const measure = result.data.drinks[0][`strMeasure${i}`];
  
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
  
    res.render("index.ejs", {
      name: result.data.drinks[0].strDrink,
      imageUrl: result.data.drinks[0].strDrinkThumb,
      instructions: result.data.drinks[0].strInstructions,
      ingredients: ingredients,
    });

    
  } catch (error) {
    console.error('Error fetching data from CocktailDB API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

