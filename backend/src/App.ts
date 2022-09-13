import { Request, Response, NextFunction } from "express";
const express = require("express");
const app = express();
const queries = require("./Queries");
require("dotenv").config();

app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// get all recipes

app.get("/recipes", async (req: Request, res: Response) => {
  const search = req.query.search || "";
  const recipes = await queries.getAllRecipes(search);

  res.send(recipes);
});

// get one recipe

app.get("/recipes/:id", async (req: Request, res: Response) => {
  const recipe = await queries.getOneRecipe(req.params.id);
  res.send(recipe);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT || 5000}`);
  console.log(process.env.PORT);
});
