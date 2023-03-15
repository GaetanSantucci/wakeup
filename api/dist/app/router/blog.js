import { getAllBlogs, getBlogById, createNewBlog } from '../controller/blog.js';
// ~ ROUTER CONFIG ~ //
import { Router } from 'express';
const router = Router();
router.get('/blogs', getAllBlogs);
router.get('/blogs/:productId(\\d+)', getBlogById);
router.post('/blogs', createNewBlog);
export { router };
