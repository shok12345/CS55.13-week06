// Import the Firebase database instance from the firebase configuration file
import { db } from './firebase';
// Import Firestore functions needed for database operations: collection (to reference collections), 
// getDocs (to fetch documents), query (to build queries), where (for filtering), documentId (to query by document ID)
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';

// Export an async function that retrieves all posts from Firebase and sorts them alphabetically by title
export async function getSortedPostsData() {
    // Create a reference to the "posts" collection in the Firebase database
    const myCollectionRef = collection(db, "posts");
    // Execute the query to fetch all documents from the posts collection (await ensures we wait for the result)
    const querySnapshot = await getDocs(myCollectionRef);
    // Transform the Firestore documents into a JavaScript array of objects
    // Each document becomes an object with its ID and all its data fields spread into the object
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Sort the array of post objects alphabetically by their title field
    // localeCompare() provides proper string comparison that handles special characters and locale-specific sorting
    jsonObj.sort(function (a, b) {
        // Compare title of object 'a' with title of object 'b' and return -1, 0, or 1 for sorting
        return a.title.localeCompare(b.title);
    });
    
    // Transform the sorted array into the final format expected by the Next.js component
    return jsonObj.map(item => {
        // Return a new object for each post with only the required fields
        return {
          // Convert the document ID to a string (ensures consistent data type)
          id: item.id.toString(),
          // Include the post title from the original data
          title: item.title,
          // Include the post date from the original data
          date: item.date,
          // Include the author field, or use 'Unknown' as fallback if author field is missing or empty
          author: item.author || 'Unknown'
        }
      });
}

// Export an async function that retrieves all post IDs for Next.js static generation
export async function getAllPostIds() {
    // Create a reference to the "posts" collection in the Firebase database
    const myCollectionRef = collection(db, "posts");
    // Execute the query to fetch all documents from the posts collection
    const querySnapshot = await getDocs(myCollectionRef);
    // Transform the Firestore documents into a JavaScript array of objects with ID and data
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Transform the array into the format required by Next.js getStaticPaths function
    return jsonObj.map(item => {
        // Return an object with a params property containing the post ID
        return {
            // Next.js expects each item to have a params object with the dynamic route parameter
            params: {
                // Convert the document ID to a string for the dynamic route parameter
                id: item.id.toString()
            }
        };
    });
}

// Export an async function that retrieves a specific post by its ID from Firebase
export async function getPostData(id) {
    // Create a reference to the "posts" collection in the Firebase database
    const myCollectionRef = collection(db, "posts");
    // Build a Firestore query to find a document with a specific ID
    const searchQuery = query(
      // Reference to the collection to search in
      myCollectionRef,
      // Create a where clause to filter documents
      where(
        // Use documentId() to query by the document's ID field
        documentId(),
        // Use equality operator to match the exact ID
        "==",
        // The ID value to search for (passed as parameter)
        id
      )
    );
    // Execute the query to fetch documents matching the specified ID
    const querySnapshot = await getDocs(searchQuery);
    // Transform the matching Firestore documents into a JavaScript array of objects
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Check if no documents were found matching the given ID
    if(jsonObj.length === 0) {
      // Return a default "not found" object if the post doesn't exist
      return {
        // Use the original ID that was searched for
        id: id,
        // Set title to indicate the post was not found
        title: 'Not found',
        // Set author to indicate the post was not found
        author: 'Not found',
        // Set date to empty space (could also be null or empty string)
        date: ' ',
        // Set content to indicate the post was not found
        contentHtml: 'Not found'
      }
    } else {
      // If a document was found, return the first (and should be only) result
      // Since we're querying by unique ID, there should only be one result
      return jsonObj [0];
    }
}