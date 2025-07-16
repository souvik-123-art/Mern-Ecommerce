import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addToMyListController,
  deleteToMyListController,
  getMyListController,
} from "../controllers/myList.controller.js";
const myListRouter = Router()

myListRouter.post('/add', auth, addToMyListController)
myListRouter.delete('/:id', auth, deleteToMyListController)
myListRouter.get("/", auth, getMyListController);

export default myListRouter