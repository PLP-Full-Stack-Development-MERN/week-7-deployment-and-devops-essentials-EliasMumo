
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api, Post } from '@/services/api';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await api.getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-sm font-medium text-muted-foreground mb-3">PERSONAL BLOG PLATFORM</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Stories & Ideas
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore thoughtfully crafted articles on design, technology, and creativity. 
            A platform for sharing ideas that inspire and inform.
          </p>
        </motion.section>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className="rounded-lg border p-4 h-[400px] animate-pulse-subtle"
              >
                <div className="bg-muted rounded-md w-full h-48 mb-4"></div>
                <div className="bg-muted rounded h-6 w-3/4 mb-3"></div>
                <div className="bg-muted rounded h-4 w-full mb-2"></div>
                <div className="bg-muted rounded h-4 w-5/6 mb-2"></div>
                <div className="bg-muted rounded h-4 w-4/6 mb-4"></div>
                <div className="flex items-center mt-4">
                  <div className="bg-muted rounded-full h-8 w-8 mr-3"></div>
                  <div className="bg-muted rounded h-4 w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {posts.length > 0 && (
              <section className="mb-16">
                <BlogCard post={posts[0]} index={0} variant="featured" />
              </section>
            )}

            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Latest Articles</h2>
              </div>

              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {posts.slice(1).map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
                {posts.length === 1 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">More articles coming soon...</p>
                  </div>
                )}
              </motion.div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Personal Blog Platform. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
