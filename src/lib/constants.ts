import type { Service, Conversation, Message } from './types';

export const SERVICE_CATEGORIES = [
  "Web Development",
  "Graphic Design",
  "Writing & Translation",
  "Digital Marketing",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
];

export const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    title: "Modern Website Design",
    description: "I will design a stunning modern website for your business.",
    category: "Web Development",
    price: 500,
    rating: 4.9,
    freelancerName: "Alice Johnson",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "website design",
  },
  {
    id: "2",
    title: "Creative Logo Design",
    description: "Unique and memorable logo for your brand.",
    category: "Graphic Design",
    price: 150,
    rating: 4.8,
    freelancerName: "Bob Williams",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "logo design",
  },
  {
    id: "3",
    title: "Engaging Blog Post Writing",
    description: "SEO-friendly blog posts that captivate your audience.",
    category: "Writing & Translation",
    price: 80,
    rating: 4.7,
    freelancerName: "Carol Davis",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "writing content",
  },
  {
    id: "4",
    title: "Social Media Marketing Strategy",
    description: "Boost your online presence with a tailored SMM strategy.",
    category: "Digital Marketing",
    price: 300,
    rating: 4.9,
    freelancerName: "David Brown",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "social media",
  },
  {
    id: "5",
    title: "Explainer Video Animation",
    description: "Animated explainer videos to simplify complex ideas.",
    category: "Video & Animation",
    price: 700,
    rating: 4.6,
    freelancerName: "Eva Green",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "video animation",
  },
  {
    id: "6",
    title: "Custom Music Composition",
    description: "Original music tracks for your projects (films, games, etc.).",
    category: "Music & Audio",
    price: 250,
    rating: 5.0,
    freelancerName: "Frank Miller",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "music production",
  },
];


export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', participantName: 'Alice Johnson', lastMessage: 'Sure, I can start next week.', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'woman smiling', unreadCount: 2 },
  { id: '2', participantName: 'Bob Williams', lastMessage: 'The logo concepts are ready!', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'man portrait' },
  { id: '3', participantName: 'Carol Davis', lastMessage: 'Payment received, thank you!', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person working' },
];

export const MOCK_MESSAGES: { [conversationId: string]: Message[] } = {
  '1': [
    { id: 'm1', sender: 'You', text: 'Hi Alice, can we discuss the project timeline?', timestamp: new Date(Date.now() - 1000 * 60 * 5), isOwnMessage: true },
    { id: 'm2', sender: 'Alice Johnson', text: 'Hello! Yes, of course.', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
    { id: 'm3', sender: 'Alice Johnson', text: 'Sure, I can start next week.', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  ],
  '2': [
    { id: 'm4', sender: 'You', text: 'Hey Bob, any updates on the logo?', timestamp: new Date(Date.now() - 1000 * 60 * 10), isOwnMessage: true },
    { id: 'm5', sender: 'Bob Williams', text: 'The logo concepts are ready!', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  ],
  '3': [
     { id: 'm6', sender: 'Carol Davis', text: 'Payment received, thank you!', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  ]
};
