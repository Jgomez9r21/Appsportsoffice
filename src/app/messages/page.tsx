"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { Conversation, Message } from "@/lib/types";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, SendHorizonal, Search, Smile } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversations[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>(selectedConversationId ? MOCK_MESSAGES[selectedConversationId] || [] : []);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversationId) {
      setMessages(MOCK_MESSAGES[selectedConversationId] || []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !selectedConversationId) return;
    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      timestamp: new Date(),
      isOwnMessage: true,
    };
    setMessages([...messages, message]);
    // Also update MOCK_MESSAGES for persistence in this mock setup
    if (!MOCK_MESSAGES[selectedConversationId]) MOCK_MESSAGES[selectedConversationId] = [];
    MOCK_MESSAGES[selectedConversationId].push(message);
    setNewMessage("");
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,4rem)-2rem)] md:h-[calc(100vh-var(--header-height,4rem)-2rem)] border rounded-lg shadow-xl overflow-hidden">
      <div className="grid grid-cols-12 h-full">
        {/* Conversations List */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r bg-card/50">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-primary">Chats</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100%-120px)]">
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className={cn(
                  "flex items-center p-3 hover:bg-accent cursor-pointer border-b",
                  selectedConversationId === convo.id && "bg-accent"
                )}
                onClick={() => handleSelectConversation(convo.id)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={convo.avatarUrl} alt={convo.participantName} data-ai-hint={convo.dataAiHint} />
                  <AvatarFallback>{convo.participantName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{convo.participantName}</p>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unreadCount && convo.unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-auto">{convo.unreadCount}</Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Message Area */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.participantName} data-ai-hint={selectedConversation.dataAiHint} />
                    <AvatarFallback>{selectedConversation.participantName.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{selectedConversation.participantName}</h3>
                    <p className="text-xs text-muted-foreground">Online</p> {/* Mock status */}
                </div>
              </div>
              <ScrollArea className="flex-1 p-4 space-y-4 bg-background">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex mb-3",
                      msg.isOwnMessage ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow",
                        msg.isOwnMessage
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <Separator />
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-card/30 flex items-center space-x-2">
                <Button variant="ghost" size="icon" type="button"><Smile className="h-5 w-5 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5 text-muted-foreground" /></Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <SendHorizonal className="h-5 w-5" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
