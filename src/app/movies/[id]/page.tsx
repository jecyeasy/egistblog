import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

interface Tag {
  id: number;
  name: string;
}

interface User {
  id: number;
  fullname: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  user: User;
  tags: Tag[];
  categoryId: number;
}

interface MoviesPostProps {
  params: {
    id: string;
  };
}

async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { user: true, tags: true },
  });
}

async function getRelatedPosts(categoryId: number, postId: number) {
  return await prisma.post.findMany({
    where: {
      categoryId: categoryId,
      NOT: { id: postId },
    },
    take: 3,
  });
}

export default async function BlogPostPage({ params }: MoviesPostProps) {
  const { id } = params;
  const post = await getPostById(id);

  if (!post) return notFound();

  const relatedPosts = await getRelatedPosts(post.categoryId, post.id);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-10 px-4 md:px-8 lg:px-16">
        {/* Main Post Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-[600px] object-cover mb-6 rounded-lg shadow-lg"
        />

        {/* Post Content */}
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-red-700 mb-6">
            <p><strong>Author:</strong> {post.user.fullname}</p>
            <p><strong>Published:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="leading-relaxed text-lg text-red-700 space-y-6 mb-10">
            {post.content}
          </div>
        </article>

        {/* Related Posts */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.length > 0 ? (
              relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                    <p className="text-red-500 mb-4">
                      {relatedPost.content.substring(0, 100)}...
                    </p>
                    <Link href={`/movies/${relatedPost.id}`} className="text-black hover:text-red-400">
                      Keep Reading
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-red-600">No related posts found.</p>
            )}
          </div>
        </section>

        {/* More Posts or Additional Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">More from Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for additional posts */}
            {/* Add a loop or additional content here, similar to related posts */}
          </div>
        </section>
      </main>
    </div>
  );
}