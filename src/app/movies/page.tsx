"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";

// Define types for Post
interface Post {
  id: number;
  title: string;
  slug: string;
  image: string;
  categoryId: number;
  content: string;
  createdAt: any;
}

// Fetcher function for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Movies: React.FC = () => {
  const router = useRouter();
  
  // Use SWR to fetch posts with options to disable re-fetching
  const { data, error, isLoading } = useSWR("/api/moviesApi", fetcher, {
    revalidateOnFocus: false, // Disable re-fetching on focus
    refreshInterval: 0, // Disable automatic refetching
  });

  const handlePostClick = (id: number) => {
    router.push(`/movies/${id}`); // Navigate to the dynamic blog post page
  };

  if (isLoading) {
    return <p>Loading posts...</p>; // Show loading message while fetching
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display error if there's any
  }

  const posts: Post[] = data?.data || []; // Assuming the posts are in data.data

  return (
    <div> 
      <div>
        <h1 className="text-3xl ml-[50px] font-bold">movies</h1>
        <div className="flex flex-col mt-10 bottom-8 relative w-[95%] m-auto ml-[50px]">
          {posts.length > 0 ? (
            posts.slice(0, 5).map((post) => (
              <div key={post.id} className="relative flex flex-row gap-16" style={{ cursor: "pointer" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  width={400}
                  className="w-[500px] h-[280px] right-8 mt-6 relative z-0 rounded-[7px]"
                />
                <div className="mt-20 absolute left-[55%] w-[350px]">
                  <h2 className="text-[15px]">{post.title}</h2> 
                  <p>{post.content.substring(0, 100)}...</p>
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                  <button
                    onClick={() => handlePostClick(post.id)}
                    className="bg-red-700 h-10 w-24 relative top-3 font-semibold rounded-[5px] text-white active:bg-white active:text-red-700"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies
