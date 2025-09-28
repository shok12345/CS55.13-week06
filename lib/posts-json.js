// Import the 'fs' module to interact with the file system
import fs from 'fs';
// Import the 'path' module to handle file and directory paths
import path from 'path';

// Create a constant that stores the path to the 'data' directory relative to the current working directory
const dataDir = path.join(process.cwd(), 'data');

// Export a function that retrieves and returns all blog post data sorted by title
export function getSortedPostsData() {
    // Create a path to the 'posts.json' file within the data directory
    const filePath = path.join(dataDir, 'posts.json');
    // Synchronously read the contents of the posts.json file as a UTF-8 encoded string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString);
    // Sort the array of posts alphabetically by title using localeCompare for proper string comparison
    jsonObj.sort(function (a, b) {
        // Return the result of comparing the title of post 'a' with the title of post 'b'
        return a.title.localeCompare(b.title);
    });
    // Transform each post object to include only the required fields and return the new array
    return jsonObj.map(item => {
        // Return a new object for each post with only id, title, and date fields
        return {
          // Convert the id to a string to ensure consistent data type
          id: item.id.toString(),
          // Include the title field from the original post
          title: item.title,
          // Include the date field from the original post
          date: item.date
        }
      });
}


// Export a function that returns all post IDs formatted for Next.js static generation
export function getAllPostIds() {
    // Create a path to the 'posts.json' file within the data directory
    const filePath = path.join(dataDir, 'posts.json');
    // Synchronously read the contents of the posts.json file as a UTF-8 encoded string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString);
    // Log the parsed JSON object to the console for debugging purposes
    console.log(jsonObj);
    // Transform each post object into the format required by Next.js getStaticPaths
    return jsonObj.map(item => {
        // Return an object with a 'params' property containing the post ID
        return {
          // Create the params object that Next.js expects for dynamic routing
          params: {
            // Convert the id to a string and assign it to the 'id' parameter
            id: item.id.toString()
          }
        }
      });
}


// Export a function that retrieves a specific post's data by its ID
export function getPostData(id) {
    // Create a path to the 'posts.json' file within the data directory
    const filePath = path.join(dataDir, 'posts.json');
    // Synchronously read the contents of the posts.json file as a UTF-8 encoded string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString);
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        // Return true if the post's ID (converted to string) matches the requested ID
        return obj.id.toString() === id;
      });
      // Check if any posts were found with the matching ID
      if (objReturned.length === 0) {
        // If no post was found, return a default "Not found" object
        return {
          // Use the requested ID as the id field
          id: id,
          // Set a default title indicating the post was not found
          title: 'Not found',
          // Set an empty date string
          date: '',
          // Set a default content indicating the post was not found
          contentHtml: 'Not found'
        }
      } else {
        // If a post was found, return the first (and only) matching post
        return objReturned[0];
      }
}