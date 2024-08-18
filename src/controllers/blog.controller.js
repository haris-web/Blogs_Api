import { Blog } from "../models/blog.model.js";
import responseMessage from "../customResponse/response.js";

const CreateBlog = async (req, res) => {
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category || !tags) {
    return res.send(responseMessage.error("All fields are required"));
  }
  try {
    const blog = await Blog.create({
      title,
      content,
      category,
      tags,
    });
    res.send(responseMessage.success("Blog created successfully", blog));
  } catch (error) {
    res.send(responseMessage.error(error));
  }
};
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send(responseMessage.error("Blog not found"));
    }
    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.tags = tags;
    await blog.save();
    return res
      .status(200)
      .send(responseMessage.success("Blog updated successfully", blog));
  } catch (error) {
    return res
      .status(500)
      .send(responseMessage.error("An error occurred while updating the blog"));
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).send(responseMessage.error("Blog not found"));
    }
    //  await blog.remove();
    return res
      .status(200)
      .send(responseMessage.success("Blog deleted successfully"));
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res
      .status(500)
      .send(
        responseMessage.error(
          "An error occurred while deleting the blog",
          error
        )
      );
  }
};
const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs.length) {
      return res.status(404).send(responseMessage.error("No blogs found"));
    }
    return res.status(200).send(responseMessage.success("All blogs", blogs));
  } catch (error) {
    return res
      .status(500)
      .send(
        responseMessage.error("An error occurred while fetching blogs", error)
      );
  }
};
const getSearchBlog = async (req, res) => {
  const {term} = req.query
  console.log(term)
  try {
    const query = term
      ? {
          $or: [
            { title: { $regex: term, $options: 'i' } },
            { content: { $regex: term, $options: 'i' } },
            { tags: { $regex: term, $options: 'i' } },
          ],
        }
      : {};

    const posts = await Blog.find(query);

    if (!posts.length) {
      return res.status(404).send(responseMessage.error("No posts found"));
    }

    // return res.status(200).send(responseMessage.success("Posts found", posts));

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).send(responseMessage.error("An error occurred while fetching posts", error));
  }

};

export { CreateBlog, updateBlog, getAllBlog, deleteBlog,getSearchBlog };
