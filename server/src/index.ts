import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";

const PORT: number = 5000;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks)
})

app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);
  const newDeck = new Deck({
    title: req.body.title,
  });

  const createDeck = await newDeck.save();
  res.json(createDeck);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
})

app.get("/hello", (req: Request, res: Response) => {
  res.send("hello new world");
});

mongoose.connect(process.env.MONGO_CURL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
