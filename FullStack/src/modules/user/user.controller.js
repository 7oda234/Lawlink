// Router bta3 el user
import { Router } from "express";
import { addNewuser, getAllUsers, getUserById, updateUserData } from "./user.service.js";
import { connection } from "../db/connection.js";
import { bootstrap } from "../app.controller.js";   
const router = Router();
// INSERT A NEW USER : http://localhost:8080/user/add
router.post("/add", addNewuser);
// SELECT ALL USERS : http://localhost:8080/user/get
router.get("/get",getAllUsers)
// SELECT USER BY ID : http://localhost:8080/user/get/:id
router.get("/get/:id",getUserById)
// UPDATE USER DATA : http://localhost:8080/user/update/:id
router.put("/update/:id",updateUserData)
export default router;