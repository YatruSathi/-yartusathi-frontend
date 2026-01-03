import React, { useState } from 'react';
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
      text: 'Hi! Welcome to our chat. How can I help you today?',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'I would like to know about event planning.',
      timestamp: '10:31 AM',
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Great! I can help you with event planning. What type of event are you interested in?',
      timestamp: '10:32 AM',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');

  const conversations: Conversation[] = [
    { id: '1', name: 'Support Team', avatar: '👨‍💼', lastMessage: 'How can I help you?' },
    { id: '2', name: 'Events Bot', avatar: '📅', lastMessage: 'Tell me about events...' },
    { id: '3', name: 'Travel Assistant', avatar: '✈️', lastMessage: "Let's plan your trip!" },
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        sender: 'user',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: String(messages.length + 2),
          sender: 'bot',
          text: 'Thanks for your message! How else can I assist you?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
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
          <Avatar sx={{ bgcolor: '#0084ff', fontSize: '20px' }}>👨‍💼</Avatar>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Support Team
            </Typography>
            <Typography variant="caption" sx={{ color: '#65676b' }}>
              Active now
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
                <Avatar sx={{ bgcolor: '#0084ff', width: 32, height: 32 }}>B</Avatar>
              )}
              <Paper
                sx={{
                  p: '8px 12px',
                  maxWidth: '60%',
                  bgcolor: message.sender === 'user' ? '#0084ff' : '#e4e6eb',
                  color: message.sender === 'user' ? '#fff' : '#000',
                  borderRadius: '18px',
                  boxShadow: 'none',
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 0.5,
                    opacity: 0.7,
                    fontSize: '11px',
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
