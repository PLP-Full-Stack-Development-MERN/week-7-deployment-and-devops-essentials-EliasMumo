
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ChevronLeft, Edit2, Clock, Tag } from 'lucide-react';
import { api, Post as PostType } from '@/services/api';
import Header from '@/components/Header';
import PostContent from '@/components/PostContent';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const postData = await api.getPost(id);
        setPost(postData);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="animate-pulse-subtle space-y-6">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded w-full mx-auto"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to all posts
            </Link>
          </nav>
          
          <article>
            <motion.header 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <div className="mb-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <span>{post.category}</span>
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="flex items-center">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="text-muted-foreground font-medium">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </div>
                
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readingTime}
                </span>
              </div>
              
              {user?.id === post.author.id && (
                <div className="flex justify-center mb-8">
                  <Button
                    onClick={() => navigate(`/edit/${post.id}`)}
                    className="inline-flex items-center"
                    variant="outline"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit post
                  </Button>
                </div>
              )}
              
              {post.cover && (
                <div className="rounded-lg overflow-hidden mb-10 max-h-[500px]">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.header>
            
            <div className="mx-auto prose prose-lg">
              <PostContent content={post.content} />
            </div>
            
            <footer className="mt-16 pt-8 border-t">
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                      <span className="text-muted-foreground font-medium">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">Written by {post.author.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Author of thoughtful articles on design and technology.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                  <Button size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Post;
