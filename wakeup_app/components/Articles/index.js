import styles from '/public/styles/Article.module.scss';

import { use } from 'react';

//Component
import Article from './Article';

//Get data
import { getArticlesData } from '/libs/getArticleList';

const articlesFetch = getArticlesData()

const Articles = () => {
  const articlesList = use(articlesFetch)


  return (
    <section className={styles.articles__container}>
      {
        articlesList.map((elem, i) => {
          const paragraph = elem.description.split('\\n')
          return <Article key={elem.title} elem={elem} paragraph={paragraph} index={i} />
        })
      }
    </section>
  )
}

export default Articles;