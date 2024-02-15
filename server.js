
const express = require("express");
const app = express();
const axios = require("axios");

require("dotenv").config();

let dbConnect = require("./dbConnect");

const Beer = require("./models/beer");

app.use(express.json());

const fetchAndStoreData = () => {
  axios
    .get("https://api.punkapi.com/v2/beers")
    .then((response) => {
      const beers = response.data;

      const formattedBeers = beers.map((beer) => ({
        name: beer.name,
        tagline: beer.tagline,
        first_brewed: beer.first_brewed,
        description: beer.description,
        image: beer.image_url,
      }));

      return Beer.bulkCreate(formattedBeers);
    })
    .then(() => {
      console.log("Data stored successfully");
    })
    .catch((error) => {
      console.error("Error fetching and storing data:", error);
    });
};

const checkDataAndFetch = async () => {
  try {
    //count is equal to rows in beer table inside sql
    const count = await Beer.count();
    if (count === 0) {
      fetchAndStoreData();
    } else {
      console.log("Data already exists in the database. Skipping fetch.");
    }
  } catch (error) {
    console.error("Error checking data:", error);
  }
};

checkDataAndFetch()

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my SQL application." });  
});

const PORT = process.env.PORT || 8080;

let beerRoutes = require("./routes/beerRoutes");
app.use("/api/beer", beerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
