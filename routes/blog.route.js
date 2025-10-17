import express from "express";
import { createBlog, deleteBlog, getAllBlog, getMyBlogs, getSingleBlogs, updateBlog } from '../controller/blog.controller.js';
import {isAdmin,isAuthenticated} from "../middleware/authUser.js";
const router=express.Router();
router.post("/create",isAuthenticated,isAdmin("admin"),createBlog);
router.delete("/delete/:id",isAuthenticated,isAdmin("admin"),deleteBlog);
router.get("/all-blogs",isAuthenticated,getAllBlog);
router.get("/single-blog/:id",isAuthenticated,getSingleBlogs);
router.get("/my-blogs",isAuthenticated,isAdmin("admin"),getMyBlogs);
router.put("/update/:id",isAuthenticated,isAdmin("admin"),updateBlog);


export default router;


