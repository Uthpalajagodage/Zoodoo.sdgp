// Create a GET route to fetch data about a specific food item
app.get('/food-recipes', (req, res) => {
  const foodId = req.query.foodId;

  // Fetch the data for the specified food ID from the food_recipes table
  const query = 'SELECT * FROM food_recipes WHERE Food_ID = ?';
  connection.query(query, [foodId], (err, rows) => {
    if (err) {
      console.error('Error fetching food recipe data: ' + err);
      res.sendStatus(500);
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'Food recipe not found' });
      return;
    }

    res.json(rows[0]);
  });
});