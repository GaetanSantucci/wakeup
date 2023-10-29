import styles from './Blog.module.scss';
import { use } from 'react';
import Blog from './Blog';
import { getBlogs } from '/src/libs/getBlog';
import Spinner from '/src/components/Spinner';
const blogsFetch = getBlogs() // ? Call methods to fecth data

const Blogs = () => {

  const blogs = use(blogsFetch)
  if (!blogs) return <Spinner />

  return (
    <section className={styles.container}>

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