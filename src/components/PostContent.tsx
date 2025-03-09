
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PostContentProps {
  content: string;
  className?: string;
}

const PostContent = ({ content, className }: PostContentProps) => {
  // This is a simplified implementation. 
  // In a real application, we would use a markdown parser like marked or remark
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn('prose max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostContent;
