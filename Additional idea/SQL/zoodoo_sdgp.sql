-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2023 at 10:56 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zoodoo_sdgp`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_details`
--

CREATE TABLE `contact_details` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Comment` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_details`
--

INSERT INTO `contact_details` (`ID`, `Name`, `Phone`, `Email`, `Comment`) VALUES
(1, 'uthpala jagodage', '0769029945', 'uthpala@gmail.com', 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `food_recipes`
--

CREATE TABLE `food_recipes` (
  `Food_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Ingredients` varchar(2000) NOT NULL,
  `Steps` varchar(10000) NOT NULL,
  `Image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food_recipes`
--

INSERT INTO `food_recipes` (`Food_ID`, `Name`, `Ingredients`, `Steps`, `Image`) VALUES
(0, 'APPLE PIE', '2 pre-made pie crusts (store-bought or homemade)\r\n6 cups of peeled, cored, and sliced apples (about 6-8 medium-sized apples)\r\n3/4 cup granulated sugar\r\n2 tablespoons all-purpose flour\r\n1 teaspoon ground cinnamon\r\n1/4 teaspoon ground nutmeg\r\n1/4 teaspoon salt\r\n1 tablespoon lemon juice\r\n2 tablespoons unsalted butter, cut into small pieces\r\n1 egg, beaten (for egg wash)\r\n1 tablespoon granulated sugar (for sprinkling)', 'Preheat your oven to 425°F (220°C).\r\n\r\nRoll out one of the pie crusts and fit it into a 9-inch pie dish. Set aside the other crust for the top.\r\n\r\nIn a large bowl, combine the sliced apples, granulated sugar, flour, cinnamon, nutmeg, salt, and lemon juice. Toss the mixture until the apples are evenly coated.\r\n\r\nPour the apple mixture into the prepared pie crust, making sure to distribute the filling evenly. Dot the top with the small pieces of butter.\r\n\r\nRoll out the second pie crust and place it over the filling. You can create a lattice design or simply lay it over the top and cut slits to allow steam to escape. Trim any excess crust and crimp the edges to seal the pie.\r\n\r\nBrush the top crust with the beaten egg, and sprinkle the tablespoon of granulated sugar over it for a golden finish.\r\n\r\nPlace the pie on a baking sheet to catch any drips, and bake in the preheated oven for 15 minutes.\r\n\r\nAfter 15 minutes, reduce the oven temperature to 375°F (190°C) and continue baking for an additional 40-50 minutes, or until the crust is golden brown and the filling is bubbly. If the edges of the crust start to brown too quickly, you can cover them with aluminum foil.\r\n\r\nOnce the pie is done, remove it from the oven and let it cool on a wire rack for at least 2 hours before serving. This will allow the filling to set.\r\n\r\nServe the apple pie warm or at room temperature, and you can enjoy it as is or with a scoop of vanilla ice cream or a dollop of whipped cream.', ''),
(1, 'BEET SALAD', '\r\n3 medium-sized beets\r\n1/2 cup crumbled feta cheese\r\n1/4 cup chopped walnuts (optional)\r\n2 tablespoons balsamic vinegar\r\n2 tablespoons extra-virgin olive oil\r\n2 tablespoons fresh lemon juice\r\n2 tablespoons chopped fresh parsley\r\nSalt and pepper to taste\r\nMixed salad greens (optional, for serving)', 'Start by cooking the beets. You can either roast or boil them. To roast, preheat your oven to 400°F (200°C). Trim off the beet greens, leaving about an inch of the stems intact. Wrap each beet in aluminum foil and place them on a baking sheet. Roast for about 45-60 minutes, or until the beets are tender when pierced with a knife. If boiling, place the trimmed beets in a large pot of boiling water and cook for about 30-40 minutes, or until tender. Once cooked, let the beets cool before handling.\r\n\r\nOnce the beets are cool enough to handle, peel off the skins using your hands or a knife. The skins should come off easily. Cut the beets into bite-sized cubes or slices and place them in a mixing bowl.\r\n\r\nAdd the crumbled feta cheese and chopped walnuts (if using) to the bowl with the beets.\r\n\r\nIn a separate small bowl, whisk together the balsamic vinegar, olive oil, lemon juice, chopped parsley, salt, and pepper until well combined.\r\n\r\nPour the dressing over the beet mixture and gently toss until everything is well coated.\r\n', ''),
(2, 'CARROT CAKE', '2 cups all-purpose flour\r\n2 cups granulated sugar\r\n1 teaspoon baking powder\r\n1/2 teaspoon baking soda\r\n1/2 teaspoon salt\r\n1 teaspoon ground cinnamon\r\n1/2 teaspoon ground nutmeg\r\n1/2 cup vegetable oil\r\n4 large eggs\r\n2 cups grated carrots\r\n1/2 cup crushed pineapple, drained\r\n1/2 cup chopped walnuts (optional)\r\n1 teaspoon vanilla extract\r\nFor the cream cheese frosting:\r\n8 oz (225g) cream cheese, softened\r\n1/2 cup unsalted butter, softened\r\n4 cups powdered sugar\r\n1 teaspoon vanilla extract\r\n\r\nOptional garnish:\r\nAdditional chopped walnuts or grated carrots', 'Preheat your oven to 350°F (175°C). Grease and flour a 9x13-inch baking pan or two 9-inch round cake pans.\r\n\r\nIn a large mixing bowl, whisk together the flour, sugar, baking powder, baking soda, salt, cinnamon, and nutmeg.\r\n\r\nAdd the vegetable oil and eggs to the dry ingredients, and mix until well combined.\r\n\r\nStir in the grated carrots, crushed pineapple, chopped walnuts (if using), and vanilla extract. Mix until the ingredients are evenly distributed.\r\n\r\nPour the batter into the prepared cake pan(s) and smooth the top with a spatula.\r\n\r\nBake in the preheated oven for 30-35 minutes for a 9x13-inch pan or 25-30 minutes for round pans, or until a toothpick inserted into the center comes out clean.\r\n\r\nRemove the cake(s) from the oven and let them cool in the pan(s) for about 10 minutes. Then transfer the cake(s) to a wire rack to cool completely.\r\n\r\nWhile the cake is cooling, prepare the cream cheese frosting. In a mixing bowl, beat the softened cream cheese and butter together until creamy and smooth.\r\n\r\nGradually add the powdered sugar, one cup at a time, while continuing to beat the mixture. Add the vanilla extract and beat until the frosting is light and fluffy.\r\n\r\nOnce the cake has cooled completely, spread the cream cheese frosting evenly over the top and sides of the cake.\r\n\r\nIf desired, garnish the cake with additional chopped walnuts or grated carrots.\r\n', ''),
(3, 'CHEESE CAKE', '2 cups graham cracker crumbs\r\n1/4 cup granulated sugar\r\n1/2 cup unsalted butter, melted\r\n\r\nFor the filling:\r\n32 oz (900g) cream cheese, softened\r\n1 1/2 cups granulated sugar\r\n4 large eggs\r\n1 teaspoon vanilla extract\r\n1/2 cup sour cream\r\n1/4 cup all-purpose flour\r\n\r\nFor the topping (optional):\r\n1 cup sour cream\r\n2 tablespoons granulated sugar\r\n1/2 teaspoon vanilla extract', '\r\nPreheat your oven to 325°F (160°C). Grease a 9-inch springform pan with butter or cooking spray.\r\n\r\nIn a mixing bowl, combine the graham cracker crumbs, granulated sugar, and melted butter for the crust. Mix until the crumbs are evenly coated with butter.\r\n\r\nPress the crumb mixture into the bottom of the prepared springform pan, creating an even layer. Use the back of a spoon or the bottom of a glass to firmly press the crumbs down.\r\n\r\nIn a large mixing bowl, beat the softened cream cheese and granulated sugar together until smooth and creamy.\r\n\r\nAdd the eggs, one at a time, beating well after each addition. Make sure to scrape down the sides of the bowl to ensure even mixing.\r\n\r\nStir in the vanilla extract, sour cream, and flour. Mix until all the ingredients are well incorporated and the batter is smooth.\r\n\r\nPour the cream cheese filling over the crust in the springform pan. Smooth the top with a spatula.\r\n\r\nPlace the pan in the preheated oven and bake for approximately 55-60 minutes, or until the edges are set but the center is slightly jiggly.\r\n\r\nRemove the cheesecake from the oven and let it cool in the pan on a wire rack for about 10 minutes.\r\n\r\nIn the meantime, prepare the optional topping by combining the sour cream, granulated sugar, and vanilla extract in a small bowl. Mix until well combined.\r\n\r\nGently spread the sour cream topping over the slightly cooled cheesecake.\r\n\r\nReturn the cheesecake to the oven and bake for an additional 5 minutes.\r\n\r\nRemove the cheesecake from the oven and let it cool completely in the pan on a wire rack.\r\n\r\nOnce completely cooled, refrigerate the cheesecake for at least 4 hours, or overnight, to allow it to set.', ''),
(4, 'CHOCOLATE CAKE', '2 cups all-purpose flour\r\n2 cups granulated sugar\r\n3/4 cup unsweetened cocoa powder\r\n1 1/2 teaspoons baking powder\r\n1 1/2 teaspoons baking soda\r\n1 teaspoon salt\r\n2 large eggs\r\n1 cup whole milk\r\n1/2 cup vegetable oil\r\n2 teaspoons vanilla extract\r\n1 cup boiling water\r\n\r\nFor the chocolate frosting:\r\n1 cup unsalted butter, softened\r\n3 1/2 cups powdered sugar\r\n1/2 cup unsweetened cocoa powder\r\n1/2 cup whole milk\r\n2 teaspoons vanilla extract', 'Preheat your oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.\r\n\r\nIn a large mixing bowl, combine the flour, sugar, cocoa powder, baking powder, baking soda, and salt. Mix well to ensure they are evenly combined.\r\n\r\nAdd the eggs, milk, vegetable oil, and vanilla extract to the dry ingredients. Mix on medium speed using an electric mixer for about 2 minutes until well combined.\r\n\r\nReduce the speed to low and slowly add the boiling water to the batter. Mix until the water is fully incorporated. The batter will be thin, but that\'s normal.\r\n\r\nPour the batter evenly into the prepared cake pans.\r\n\r\nBake in the preheated oven for 30 to 35 minutes, or until a toothpick inserted into the center of the cakes comes out clean.\r\n\r\nRemove the cakes from the oven and allow them to cool in the pans for about 10 minutes. Then, transfer them to a wire rack to cool completely.\r\n\r\nWhile the cakes are cooling, prepare the chocolate frosting. In a large bowl, cream the butter until it becomes light and fluffy. Gradually add the powdered sugar and cocoa powder, alternating with the milk. Mix well after each addition. Finally, stir in the vanilla extract and beat until the frosting is smooth and creamy.\r\n\r\nOnce the cakes have cooled completely, spread a layer of chocolate frosting on top of one cake layer. Place the second cake layer on top and frost the top and sides of the cake with the remaining chocolate frosting.\r\n\r\nYou can decorate the cake as desired with chocolate shavings, sprinkles, or any other toppings you prefer.\r\n\r\nSlice and serve the delicious homemade chocolate cake!', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_details`
--
ALTER TABLE `contact_details`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_details`
--
ALTER TABLE `contact_details`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
