
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    cover?: string;
    author: {
      name: string;
      avatar?: string;
    };
    publishedAt: string;
    readingTime: string;
    category: string;
  };
  index: number;
  variant?: 'default' | 'featured';
}

const BlogCard = ({ post, index, variant = 'default' }: BlogCardProps) => {
  const isFeatured = variant === 'featured';
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border transition-all duration-300',
        isFeatured ? 'md:flex-row md:max-h-[360px]' : 'h-full'
      )}
    >
      <div 
        className={cn(
          'relative overflow-hidden bg-muted',
          isFeatured ? 'md:w-1/2 aspect-[16/9]' : 'aspect-[16/9]'
        )}
      >
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
        )}
        
        <div className="absolute top-4 left-4">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-background text-foreground">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className={cn(
        'flex flex-col p-6',
        isFeatured ? 'md:w-1/2 md:p-8' : ''
      )}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        
        <h3 className={cn(
          'font-semibold tracking-tight text-foreground mb-2 line-clamp-2',
          isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
        )}>
          <Link to={`/post/${post.id}`} className="hover:underline underline-offset-4">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 mb-6">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center gap-3">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="rounded-full object-cover w-8 h-8"
            />
          ) : (
            <div className="rounded-full bg-muted w-8 h-8 flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                {post.author.name.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-sm font-medium">
            {post.author.name}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
