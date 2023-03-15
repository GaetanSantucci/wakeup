var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Blog } from '../datamapper/blog.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogsList = yield Blog.findAll();
        console.log('blogsList: ', blogsList);
        if (!blogsList)
            throw new ErrorApi('Impossible d\'obtenir les blogs', req, res, 400);
        return res.status(200).json(blogsList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = +req.params.BlogId;
        const blog = yield Blog.findOne(blogId);
        console.log('blog: ', blog);
        if (!blog)
            throw new ErrorApi('Blog non trouvé', req, res, 400);
        return res.status(200).json(blog);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
const createNewBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { name, description, image, price } = req.body
        const newBlog = yield Blog.create(req.body);
        if (newBlog)
            return res.status(200).json('Le nouveau blog a bien été crée');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
export { getAllBlogs, getBlogById, createNewBlog };
