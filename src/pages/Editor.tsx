import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { api, Post } from '@/services/api';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

const Editor = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Design');
  const [tags, setTags] = useState<string[]>([]);
  const [coverUrl, setCoverUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to create or edit posts');
      navigate('/login');
      return;
    }
    
    if (isEditing && id) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const post = await api.getPost(id);
          
          if (post.author.id !== user.id) {
            toast.error('You can only edit your own posts');
            navigate('/');
            return;
          }
          
          setTitle(post.title);
          setContent(post.content);
          setExcerpt(post.excerpt);
          setCategory(post.category);
          setTags(post.tags);
          if (post.cover) setCoverUrl(post.cover);
        } catch (error) {
          console.error('Failed to fetch post:', error);
          toast.error('Failed to load post');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchPost();
    }
  }, [id, isEditing, navigate, user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !excerpt.trim() || !category.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSaving(true);
      
      if (isEditing && id) {
        await api.updatePost(id, {
          title,
          content,
          excerpt,
          category,
          tags,
          cover: coverUrl || undefined
        });
        
        toast.success('Post updated successfully');
        navigate(`/post/${id}`);
      } else {
        const newPost = await api.createPost({
          title,
          content,
          excerpt,
          category,
          tags,
          cover: coverUrl || undefined,
          author: {
            id: user?.id || '0',
            name: user?.name || 'Anonymous'
          }
        });
        
        toast.success('Post created successfully');
        navigate(`/post/${newPost.id}`);
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      toast.error('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        (e.target as HTMLInputElement).value = '';
      }
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Loading post data...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-8">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your post (will be displayed in cards)"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                  required
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cover" className="text-sm font-medium">
                  Cover Image URL
                </label>
                <div className="flex gap-4">
                  <input
                    id="cover"
                    type="text"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="Paste an image URL (https://...)"
                    className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('cover')?.focus()}
                  >
                    <ImagePlus className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
                {coverUrl && (
                  <div className="mt-2 rounded-md overflow-hidden max-h-[200px]">
                    <img
                      src={coverUrl}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={() => {
                        toast.error('Failed to load image');
                        setCoverUrl('');
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="Design">Design</option>
                    <option value="UX Design">UX Design</option>
                    <option value="Typography">Typography</option>
                    <option value="Development">Development</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags (press Enter or comma to add)
                  </label>
                  <input
                    id="tags"
                    type="text"
                    onKeyDown={handleTagInput}
                    placeholder="Add tags..."
                    className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1.5 text-muted-foreground hover:text-foreground"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here. HTML is supported for formatting."
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[300px]"
                  required
                ></textarea>
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting. For example, &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;
                </p>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(isEditing && id ? `/post/${id}` : '/')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSaving}
                >
                  {isEditing ? 'Update Post' : 'Publish Post'}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default Editor;
