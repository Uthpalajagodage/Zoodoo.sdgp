export const dietPlans = [
  {
    name: "Low Calorie",
    bmiRange: { min: 0, max: 18.5 },
    description: `This diet plan is for individuals who have a BMI below 18.5 and need to gain weight.
BreakfastnGreek yogurt with mixed berries, granola, and a drizzle of honey
A smoothie made with milk, frozen fruit, nut butter, and a scoop of protein powder.
Whole-grain toast with avocado, a fried egg,
Oatmeal made with milk, topped with sliced banana, nuts, and a drizzle of honey or maple syrup
Whole-grain pancakes or waffles with fresh fruit and a dollop of Greek yogurt
Lunch
A turkey or chicken sandwich made with whole-grain bread, avocado, lettuce, tomato, and mayonnaise
Grilled chicken or fish with a side of quinoa or brown rice and steamed vegetables
A hearty salad made with mixed greens, grilled chicken, nuts or seeds
A whole-grain wrap filled with grilled veggies, hummus, and sliced turkey or chicken
Lentil soup with a side of whole-grain crackers and a mixed green salad
Dinner
Grilled or baked salmon with a side of roasted sweet potatoes and asparagus
A stir-fry made with lean protein
Whole-grain pasta with a tomato-based sauce, lean protein, such as shrimp or chicken, and a side of mixed veggies
A baked sweet potato stuffed with black beans, salsa, and a dollop of Greek yogurt
A vegetable soup or stew made with lean protein`,
  },
  {
    name: "Balanced Diet",
    bmiRange: { min: 18.5, max: 24.9 },
    description:
      "This diet plan is for individuals who have a normal BMI between 18.5 and 24.9 and need to maintain their weight. Keep up the good work",
  },
  {
    name: "Weight Loss",
    bmiRange: { min: 25, max: 29.9 },
    description: `This diet plan is for individuals who have a BMI between 25 and 29.9 and need to lose weight. Breakfast Scrambled eggs with sautéed veggies, such as spinach, onions, and bell peppers
      A smoothie made with unsweetened almond milk, frozen berries, spinach, and a scoop of protein powder
      Whole-grain toast with mashed avocado and a sliced hard-boiled egg
      Greek yogurt with mixed berries, chia seeds, and a drizzle of honey
      Overnight oats made with milk, chia seeds, and sliced fruitn LunchnGrilled Chicken/Fish with a side of roasted vegitables or salad
      A veggie/hummus wrap with whole grain bread or tortilla
      A bowl of vegitable soup with a slice of whole grain bread or crackers
      A turkey or veggie burger
      A spinach salad with grilled chicken or shrimpnDinnernGrilled or baked salmon with a side of roasted vegetables
      A vegetable stir-fry
      A hearty vegetable soup or stew with lean protein
      A large salad 
      A baked sweet potato topped with black beans, salsa, and a dollop of plain Greek yogurt.
      `,
  },
  {
    name: "Obese",
    bmiRange: { min: 30, max: 100 },
    description: `This diet plan is for individuals who have a BMI over 30 and need to lose a significant amount of weight.n Breakfastn Scrambled eggs with sautéed veggies, such as spinach, onions, and bell peppers
      A smoothie made with unsweetened almond milk, frozen berries, spinach, and a scoop of protein powder
      Whole-grain toast with mashed avocado and a sliced hard-boiled egg
      Greek yogurt with mixed berries, chia seeds, and a drizzle of honey
      Overnight oats made with milk, chia seeds, and sliced fruitn LunchnGrilled Chicken/Fish with a side of roasted vegitables or salad
      A veggie/hummus wrap with whole grain bread or tortilla
      A bowl of vegitable soup with a slice of whole grain bread or crackers
      A turkey or veggie burger
      A spinach salad with grilled chicken or shrimpnDinnernGrilled or baked salmon with a side of roasted vegetables
      A vegetable stir-fry
      A hearty vegetable soup or stew with lean protein
      A large salad 
      A baked sweet potato topped with black beans, salsa, and a dollop of plain Greek yogurt.
      `,
  },
];

// // Function to get the diet plan based on the user's BMI value
// function getDietPlan(bmiValue) {
//   // Find the diet plan with the corresponding BMI range
//   const dietPlan = dietPlans.find(
//     (plan) => bmiValue >= plan.bmiRange.min && bmiValue <= plan.bmiRange.max
//   );

//   // Return the diet plan
//   return dietPlan;
// }
