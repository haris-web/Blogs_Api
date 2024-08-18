import { Router } from "express";
import {CreateBlog,updateBlog,deleteBlog,getAllBlog,getSearchBlog }from "../controllers/blog.controller.js"

const router = Router();
router.route("/createblog").post(CreateBlog);
router.route("/updateblog/:id").put(updateBlog);
router.route("/deleteblog/:id").delete(deleteBlog);
router.route("/blogs").get(getAllBlog);
router.route("/blogslist").post(getSearchBlog);
export default router;
