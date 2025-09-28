// Import the Head component from Next.js for managing document head elements
import Head from 'next/head';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import the Layout component and siteTitle constant from the layout file
import Layout, { siteTitle } from '../components/layout';
// Import CSS module styles for utility classes
import utilStyles from '../styles/utils.module.css';
// Import the Date component for formatting dates
import Date from '../components/date';
// Import the getSortedPostsData function from the posts library
import { getSortedPostsData } from '../lib/posts-firebase';
 
// Export an async function that runs at build time to fetch data for static generation
export async function getStaticProps() {
  // Call the getSortedPostsData function to retrieve all blog post data
  const allPostsData = await getSortedPostsData();
  // Return an object containing props that will be passed to the component
  return {
    // Define the props object containing the data
    props: {
      // Pass the allPostsData array as a prop to the component
      allPostsData,
    },
  };
}


// Define and export the Home component as the default export
export default function Home({ allPostsData}) {
  // Destructure allPostsData from the props parameter
  // Return JSX that represents the component's UI
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className={utilStyles.postborder}>
          <h4>Bio</h4>
          <p> 
              Hello, Im <strong>Sho Katsuki</strong>. Im originally from Japan and then moved to California in 2017. Im currently attending Santa Rosa 
              Junior College for my full-stack web development certificate.
          </p>
          <h4>
              Things I like
          </h4>
          <ul>
              <li>
                Basketball
              </li>
              <li>
                Coding
              </li>
              <li>
                Video games
              </li>
              <li>
                Music
              </li>
              <li>
                Good food
              </li>
          </ul>


        </div>
        
        
        <p>
          <Link href="/posts/first-post">Read my first post →</Link>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* Use the map function to iterate over the allPostsData array */}
          {allPostsData.map(({ id, date, title, author }) => (
           /* Destructure id, date, title, and author from each post object */
           <li className={utilStyles.listItem} key={id}>
           {/* Create a Link component with dynamic href using template literal */}
           <Link href={`/posts/${id}`}>{title}</Link>
           <br />
           <small className={utilStyles.lightText}>
             {/* Display author and date */}
             By {author} • <Date dateString={date} />
           </small>
         </li>
          ))}
        </ul>
      </section>


    </Layout>
  );
}