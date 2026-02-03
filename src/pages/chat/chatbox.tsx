import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  avatar?: string;
  isThinking?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi! I am YatruSathi AI, your personal travel assistant for Nepal. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');
  const [isBotThinking, setIsBotThinking] = useState(false);

  const conversations: Conversation[] = [
    { id: '1', name: 'YatruSathi AI', avatar: '🤖', lastMessage: 'Namaste! Ask me anything!' },
    { id: '2', name: 'Support Team', avatar: '👨‍💼', lastMessage: 'How can I help you?' },
  ];

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isBotThinking) {
      const userText = inputValue.trim();
      const userMessage: Message = {
        id: String(Date.now()),
        sender: 'user',
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsBotThinking(true);

      // Add a temporary "thinking" message
      const thinkingId = String(Date.now() + 1);
      const thinkingMessage: Message = {
        id: thinkingId,
        sender: 'bot',
        text: '...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isThinking: true
      };
      setMessages(prev => [...prev, thinkingMessage]);

      try {
        if (selectedChat === '1') {
          // Call the YatruSathi AI Flask Backend
          const response = await axios.get(`http://127.0.0.1:5000/get`, {
            params: { msg: userText }
          });

          const botReply = response.data.reply;

          // Replace thinking message with actual reply
          setMessages(prev => prev.map(msg => 
            msg.id === thinkingId 
              ? { ...msg, text: botReply, isThinking: false } 
              : msg
          ));
        } else {
          // Simulate standard support reply for other chats
          setTimeout(() => {
            setMessages(prev => prev.map(msg => 
              msg.id === thinkingId 
                ? { ...msg, text: "Our support team is currently offline. Please try our AI assistant!", isThinking: false } 
                : msg
            ));
          }, 1000);
        }
      } catch (error) {
        console.error("AI Chatbot Error:", error);
        setMessages(prev => prev.map(msg => 
          msg.id === thinkingId 
            ? { ...msg, text: "Sorry, I'm having trouble connecting to my brain right now. Is the AI server running?", isThinking: false } 
            : msg
        ));
      } finally {
        setIsBotThinking(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '90vh', bgcolor: '#fff' }}>
      {/* Conversations Sidebar */}
      <Box
        sx={{
          width: { xs: '100%', sm: 320 },
          borderRight: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#fff',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Messages
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search conversations..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                bgcolor: '#f0f2f5',
              },
            }}
          />
        </Box>
        <Divider />
        <List sx={{ flex: 1, overflow: 'auto' }}>
          {conversations.map(conv => (
            <ListItem key={conv.id} disablePadding>
              <ListItemButton
                selected={selectedChat === conv.id}
                onClick={() => setSelectedChat(conv.id)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: '#f0f2f5',
                  },
                  '&:hover': {
                    bgcolor: '#f0f2f5',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#0084ff', fontSize: '24px' }}>{conv.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={conv.name}
                  secondary={conv.lastMessage}
                  secondaryTypographyProps={{
                    noWrap: true,
                    sx: { color: '#65676b' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#fff',
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e5e5e5',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: '#FF4B2B', fontSize: '20px' }}>🤖</Avatar>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              YatruSathi AI
            </Typography>
            <Typography variant="caption" sx={{ color: '#65676b' }}>
              Powered by StepFun 3.5
            </Typography>
          </Box>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: '#fff',
          }}
        >
          {messages.map(message => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: 1,
              }}
            >
              {message.sender === 'bot' && (
                <Avatar sx={{ bgcolor: '#FF4B2B', width: 32, height: 32, fontSize: '14px' }}>🤖</Avatar>
              )}
              <Paper
                sx={{
                  p: '8px 12px',
                  maxWidth: '75%',
                  bgcolor: message.sender === 'user' ? '#0084ff' : '#f0f2f5',
                  color: message.sender === 'user' ? '#fff' : '#050505',
                  borderRadius: '18px',
                  boxShadow: 'none',
                  border: message.sender === 'bot' ? '1px solid #e5e5e5' : 'none',
                  position: 'relative'
                }}
              >
                {message.isThinking ? (
                  <Box sx={{ display: 'flex', gap: 0.5, py: 1, px: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#90949c', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                    <Box sx={{ width: 8, height: 8, bgcolor: '#90949c', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.16s' }} />
                    <Box sx={{ width: 8, height: 8, bgcolor: '#90949c', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.32s' }} />
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{message.text}</Typography>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 0.5,
                    opacity: 0.7,
                    fontSize: '11px',
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}
                >
                  {message.timestamp}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Divider />
        <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <IconButton size="small" sx={{ color: '#0084ff' }}>
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Aa"
            multiline
            maxRows={4}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                bgcolor: '#f0f2f5',
              },
            }}
          />
          <IconButton size="small" sx={{ color: '#0084ff' }}>
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton size="small" onClick={handleSendMessage} sx={{ color: '#0084ff' }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Chatbox;
