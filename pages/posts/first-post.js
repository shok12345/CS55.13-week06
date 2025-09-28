// Import the Head component from Next.js for managing document head elements
import Head from 'next/head';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import the Script component from Next.js for loading external scripts
import Script from 'next/script';
// Import the custom Layout component from the components directory
import Layout from '../../components/layout';

// Define and export the FirstPost component as the default export
export default function FirstPost() {
    // Return JSX that represents the component's UI
    return (
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <Script
          // URL of the external script to load (Facebook SDK)
          src="https://connect.facebook.net/en_US/sdk.js"
          // Strategy determines when the script loads (lazyOnload = after page loads)
          strategy="lazyOnload"
          // Callback function that runs when the script finishes loading
          onLoad={() =>
            // Log a message to the browser console when script loads successfully
            console.log(`script loaded correctly, window.FB has been populated`)
          }
        />
        <h1>First Post</h1>
        <div className="postborder">
            <p>This is my first post. This post will discuss why Lebron james is the <strong>GOAT</strong> (Greatest Of All Time)</p>
            <p>
                LeBron James is considered the GOAT in basketball by many because 
                of his incredible all-around game, long-lasting career, and consistent dominance. He can 
                score, pass, rebound, and defend at a high level, making him one of the most complete 
                players ever. LeBron has played at an elite level for over 20 years, made 10 NBA Finals, 
                won 4 championships, and broken numerous records — including becoming the all-time 
                leading scorer. His leadership, basketball IQ, and ability to make teammates better 
                also set him apart. LeBron's impact on and off the court makes a strong case for him 
                being the greatest ever.
            </p>

            <img className="postimage" src="/images/lebron.jpg" alt="Lebron James"></img>
        </div>
        
      </Layout>
    );
  }