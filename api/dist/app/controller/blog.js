import { Blog } from '../datamapper/blog.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllBlogs = async (req, res) => {
    try {
        // ? Find all blogs in the database
        const blogsList = await Blog.findAll();
        // ? If there are no blogs, throw an error
        if (!blogsList)
            throw new ErrorApi("Impossible d'obtenir les blogs", req, res, 400);
        return res.status(200).json(blogsList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const getBlogById = async (req, res) => {
    try {
        // ? Extract the blog ID from the request parameters
        const blogId = +req.params.BlogId;
        // ? Find the blog with the given ID in the database
        const blog = await Blog.findOne(blogId);
        console.log('blog: ', blog);
        // ? If the blog is not found, throw an error
        if (!blog)
            throw new ErrorApi('Blog non trouvé', req, res, 400);
        return res.status(200).json(blog);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const createNewBlog = async (req, res) => {
    try {
        // ? Create a new blog in the database using the request body
        const newBlog = await Blog.create(req.body);
        // ? If the blog is created successfully, send a success message
        if (newBlog)
            return res.status(200).json('Le nouveau blog a bien été crée');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { getAllBlogs, getBlogById, createNewBlog };
