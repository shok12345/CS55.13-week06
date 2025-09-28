// Import the Layout component from the components directory
import Layout from '../../components/layout';
// Import the Head component from Next.js for managing document head elements
import Head from 'next/head';
// Import the Date component for formatting dates
import Date from '../../components/date';
// Import CSS module styles for utility classes
import utilStyles from '../../styles/utils.module.css';
 
// Import the getAllPostIds and getPostData functions from the posts library
import { getAllPostIds, getPostData } from '../../lib/posts-firebase';
 
// Export an async function that runs at build time to fetch data for static generation
export async function getStaticProps({ params }) {
    // Destructure params from the function parameter
    // Call getPostData with the id from params and await the result
    const postData = await getPostData(params.id);
   
    // Return an object containing props that will be passed to the component
    return {
      // Define the props object containing the data
      props: {
        // Pass the postData object as a prop to the component
        postData,
      },
    };
  }
 
// Export an async function that tells Next.js which paths to pre-render at build time
export async function getStaticPaths() {
  // Call getAllPostIds to get an array of all post IDs and their paths
  const paths = await getAllPostIds();
  // Return an object containing the paths and fallback configuration
  return {
    // Pass the paths array to Next.js for pre-rendering
    paths,
    // Set fallback to false to return 404 for paths not returned by getStaticPaths
    fallback: false,
  };
}


// Define and export the Post component as the default export
export default function Post({ postData }) {
    // Destructure postData from the props parameter
    // Return JSX that represents the component's UI
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            By {postData.author} • <Date dateString={postData.date} />
          </div>
          <div className={utilStyles.postborder} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }