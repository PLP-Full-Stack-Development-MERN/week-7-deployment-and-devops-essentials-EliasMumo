
// Mock API service
// In a real application, this would make actual HTTP requests to your backend

import { toast } from 'sonner';

// Types
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  cover?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
}

// Sample data
const samplePosts: Post[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Design',
    content: `
      <p>Minimalism in design is more than just a visual style—it's a philosophy that centers around the idea that simplicity is the ultimate sophistication.</p>
      
      <h2>Origins of Minimalism</h2>
      <p>The minimalist design approach emerged in the late 1950s and early 1960s, drawing inspiration from Japanese traditional design and architecture. The core principle was to strip away unnecessary elements, leaving only what was essential for functionality and aesthetic appeal.</p>
      
      <p>Ludwig Mies van der Rohe's famous phrase, "Less is more," perfectly encapsulates the minimalist philosophy. This approach prioritizes:</p>
      
      <ul>
        <li>Clean lines and forms</li>
        <li>Limited color palettes</li>
        <li>Ample negative space</li>
        <li>Functional elements that serve a purpose</li>
      </ul>
      
      <h2>Minimalism in Digital Design</h2>
      <p>In today's digital landscape, minimalism has evolved but remains grounded in its foundational principles. Modern interfaces benefit from minimalist approaches in several ways:</p>
      
      <p>Better user experience: By removing distractions, users can focus on what matters, making interactions more intuitive and efficient.</p>
      
      <p>Improved performance: Simpler designs typically require fewer resources to load and operate, resulting in faster websites and applications.</p>
      
      <p>Enhanced accessibility: Clean, straightforward designs are often more accessible to users with disabilities, as they reduce cognitive load and are easier to navigate with assistive technologies.</p>
      
      <h2>Practical Application</h2>
      <p>To implement minimalist principles in your design work:</p>
      
      <ol>
        <li>Start with a clear purpose for each element</li>
        <li>Eliminate anything that doesn't serve that purpose</li>
        <li>Use a limited, harmonious color palette</li>
        <li>Embrace whitespace as a design element</li>
        <li>Choose typography carefully, favoring readability over decoration</li>
      </ol>
      
      <p>Remember, minimalism isn't about making something boring or empty—it's about making deliberate choices that highlight what matters most.</p>
    `,
    excerpt: 'Explore how minimalism in design creates more effective and appealing user experiences by focusing on what truly matters.',
    cover: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1947&q=80',
    author: {
      id: '1',
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    publishedAt: '2023-11-15T10:30:00Z',
    updatedAt: '2023-11-15T10:30:00Z',
    readingTime: '4 min read',
    category: 'Design',
    tags: ['minimalism', 'design', 'ux']
  },
  {
    id: '2',
    title: 'Building Intuitive User Interfaces',
    content: `
      <p>The best interfaces are those that users barely notice. When an interface is truly intuitive, it fades into the background, allowing users to accomplish their goals without friction or confusion.</p>
      
      <h2>The Psychology of Intuitive Design</h2>
      <p>Intuitive interfaces work because they align with users' mental models—the internal representations people have about how something should work based on their past experiences and knowledge.</p>
      
      <p>To create truly intuitive interfaces, designers must understand:</p>
      
      <ul>
        <li>User expectations and mental models</li>
        <li>The context in which the interface will be used</li>
        <li>The goals users are trying to accomplish</li>
        <li>Universal design patterns that users already understand</li>
      </ul>
      
      <h2>Key Principles of Intuitive UI Design</h2>
      
      <h3>Consistency</h3>
      <p>Consistent interfaces allow users to transfer knowledge from one part of your application to another. This includes visual consistency (colors, typography, spacing) and behavioral consistency (how interactions work).</p>
      
      <h3>Visibility of System Status</h3>
      <p>Users should always know what's happening in the system through appropriate feedback within a reasonable time. This means clear loading states, error messages, and success confirmations.</p>
      
      <h3>Recognition Over Recall</h3>
      <p>Minimize the user's memory load by making objects, actions, and options visible. Users shouldn't have to remember information from one part of the interface to another.</p>
      
      <h3>Forgiving Interfaces</h3>
      <p>Well-designed interfaces make it easy to recover from errors. Provide undo functionality, confirmation for irreversible actions, and clear paths back to safety.</p>
      
      <h2>Testing for Intuitiveness</h2>
      <p>No matter how experienced the designer, intuitive design requires testing with real users. Some effective methods include:</p>
      
      <ul>
        <li>Usability testing with representative users</li>
        <li>The "five-second test" to gauge immediate comprehension</li>
        <li>Task completion analysis to identify friction points</li>
        <li>Heatmap and click tracking to see where users actually focus</li>
      </ul>
      
      <p>Remember that intuitive design is not about what makes sense to you as the designer, but what makes sense to your users based on their experiences and expectations.</p>
    `,
    excerpt: 'Learn the principles and psychology behind interfaces that feel natural and effortless to use.',
    cover: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: {
      id: '2',
      name: 'Jamie Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    publishedAt: '2023-11-12T14:45:00Z',
    updatedAt: '2023-11-13T09:15:00Z',
    readingTime: '6 min read',
    category: 'UX Design',
    tags: ['ux', 'interface design', 'usability']
  },
  {
    id: '3',
    title: 'Typography Fundamentals for Designers',
    content: `
      <p>Typography is perhaps the most essential element of design. It's not just about choosing beautiful fonts—it's about communication, hierarchy, and user experience.</p>
      
      <h2>The Elements of Typography</h2>
      <p>Understanding typography begins with familiarizing yourself with its basic components:</p>
      
      <ul>
        <li><strong>Typeface and Font:</strong> A typeface is the design of the letters, while a font is a specific size, weight, and style of a typeface.</li>
        <li><strong>Leading:</strong> The vertical space between lines of text.</li>
        <li><strong>Tracking:</strong> The uniform spacing between characters in a text block.</li>
        <li><strong>Kerning:</strong> The adjustment of space between specific character pairs.</li>
        <li><strong>Hierarchy:</strong> The organization of text elements to show their order of importance.</li>
      </ul>
      
      <h2>Selecting the Right Typefaces</h2>
      <p>Choosing appropriate typefaces is crucial for effective design. Consider:</p>
      
      <h3>Readability</h3>
      <p>The most important function of typography is to be read. On screens, sans-serif fonts like Inter, SF Pro, and Roboto often perform well at smaller sizes, while serif fonts can add sophistication to headings.</p>
      
      <h3>Personality</h3>
      <p>Typefaces carry emotional weight and personality. A geometric sans-serif might feel modern and clean, while a handwritten font could convey creativity or personal touch.</p>
      
      <h3>Versatility</h3>
      <p>Choose typefaces with multiple weights and styles to create contrast and hierarchy within a single font family. This creates cohesion while still allowing for variety.</p>
      
      <h2>Typography Systems</h2>
      <p>Developing a systematic approach to typography brings consistency and efficiency to designs:</p>
      
      <h3>Type Scale</h3>
      <p>Establish a mathematical scale for your font sizes rather than choosing arbitrary values. Common ratios include 1.2 (minor third) or 1.5 (perfect fifth).</p>
      
      <h3>Grid-Based Alignment</h3>
      <p>Align typography to a baseline grid to create rhythm and harmony across different text elements and pages.</p>
      
      <h3>Responsive Considerations</h3>
      <p>Plan how typography will adapt across different screen sizes, potentially adjusting not just size but also line length, leading, and even font weight for optimal readability.</p>
      
      <h2>Common Typography Mistakes</h2>
      <p>Even experienced designers can fall into these traps:</p>
      
      <ul>
        <li>Using too many typefaces (stick to 2-3 maximum for most projects)</li>
        <li>Neglecting line length (aim for 45-75 characters per line)</li>
        <li>Poor contrast between text and background</li>
        <li>Inconsistent alignment without purpose</li>
        <li>Forgetting to test readability on actual devices</li>
      </ul>
      
      <p>Typography might seem like a small detail, but it's the foundation upon which user experience is built. Mastering these fundamentals will elevate every design you create.</p>
    `,
    excerpt: 'Master the fundamentals of typography to enhance readability, establish hierarchy, and create more cohesive designs.',
    cover: 'https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    author: {
      id: '3',
      name: 'Tyler Washington',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    publishedAt: '2023-11-08T08:20:00Z',
    updatedAt: '2023-11-08T08:20:00Z',
    readingTime: '5 min read',
    category: 'Typography',
    tags: ['typography', 'design', 'readability']
  }
];

// API methods
export const api = {
  // Posts
  getPosts: async (): Promise<Post[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [...samplePosts];
  },
  
  getPost: async (id: string): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const post = samplePosts.find(p => p.id === id);
    if (!post) {
      toast.error('Post not found');
      throw new Error('Post not found');
    }
    return { ...post };
  },
  
  createPost: async (postData: Omit<Post, 'id' | 'publishedAt' | 'updatedAt' | 'readingTime'>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readingTime: `${Math.ceil(postData.content.length / 1000)} min read`
    };
    
    // In a real app, this would be stored in a database
    toast.success('Post created successfully');
    return newPost;
  },
  
  updatePost: async (id: string, postData: Partial<Post>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const postIndex = samplePosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      toast.error('Post not found');
      throw new Error('Post not found');
    }
    
    const updatedPost = {
      ...samplePosts[postIndex],
      ...postData,
      updatedAt: new Date().toISOString()
    };
    
    toast.success('Post updated successfully');
    return updatedPost;
  },
  
  deletePost: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const postIndex = samplePosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      toast.error('Post not found');
      throw new Error('Post not found');
    }
    
    toast.success('Post deleted successfully');
  }
};
