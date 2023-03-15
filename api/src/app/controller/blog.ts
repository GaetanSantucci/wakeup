import { Request, Response } from 'express';

import { Blog } from '../datamapper/blog.js';
import { ErrorApi } from '../services/errorHandler.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const getAllBlogs = async (req: Request, res: Response) => {
  try {

    const blogsList = await Blog.findAll();
    console.log('blogsList: ', blogsList);

    if (!blogsList) throw new ErrorApi('Impossible d\'obtenir les blogs', req, res, 400);

    return res.status(200).json(blogsList)

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const getBlogById = async (req: Request, res: Response) => {
  try {

    const blogId = +req.params.BlogId;
    const blog = await Blog.findOne(blogId);
    console.log('blog: ', blog);

    if (!blog) throw new ErrorApi('Blog non trouvé', req, res, 400);

    return res.status(200).json(blog)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const createNewBlog = async (req: Request, res: Response) => {

  try {
    // const { name, description, image, price } = req.body
    const newBlog = await Blog.create(req.body)

    if (newBlog) return res.status(200).json('Le nouveau blog a bien été crée');

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

export { getAllBlogs, getBlogById, createNewBlog }