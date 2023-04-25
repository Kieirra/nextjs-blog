import Date from '@/components/date';
import { PostData, getSortedPostsData } from '@/lib/posts';
import utilStyles from '@/styles/utils.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

/** 
 * This function will be called at build time on server-side.
 * It won't be called on client-side, so you can even do
 * direct database queries. 'getStaticProps' is a Next.js keyword'
 * 
 * If we name it 'getServerSideProps' instead, it will be called
 * at each request.
 * */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home = ({ allPostsData }: { allPostsData: PostData[] }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export default Home;