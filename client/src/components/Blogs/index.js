'use client';
import styles from './Blog.module.scss';
import { useEffect, useState } from 'react';
import Blog from './Blog';
import { getBlogs } from '/src/libs/getBlog';
import Spinner from '/src/components/Spinner';
const blogsFetch = getBlogs() // ? Call methods to fecth data

const Blogs = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [blogs, setBlogs] = useState([]) // ? Set blogs to empty array to avoid error when mapping [blogs

  useEffect(() => {

    const fecthBlogs = async () => {
    try {
      setIsLoading(true)
      const response = await blogsFetch;
      if(response) setBlogs(response)

    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }}
    fecthBlogs()

  }, [])
  // const blogs = use(blogsFetch)
  if (blogs.length < 1 ) return <Spinner />

  return (
    <section className={styles.container}>
      { isLoading && <Spinner />}
      {
        blogs.map((elem, i) => {
          const paragraph = elem.description.split('\\n') // to create line break
          return <Blog key={elem.title} elem={elem} paragraph={paragraph} index={i} />
        })
      }
    </section>
  )
}

export default Blogs;