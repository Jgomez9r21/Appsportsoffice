export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  freelancerName: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isOwnMessage?: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  lastMessage: string;
  avatarUrl: string;
  dataAiHint?: string;
  unreadCount?: number;
}
