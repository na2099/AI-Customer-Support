'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Box, Button, Divider, Link, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase'; // Ensure the correct path is used for your Firebase auth file

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json(); // Assuming the response is JSON

      // Assuming the API returns an array of messages
      responseData.forEach((item) => {
        setMessages((currentMessages) => [
          ...currentMessages,
          { role: 'assistant', content: item.content },
        ]);
      });

    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color='white'
      sx={{
        bgcolor: '#131b2b',
        background: 'linear-gradient(to top, #131b2b, #060816, #102937, #060816, #131b2b)'
      }}
    >
      <AppBar position="fixed" top={0} style={{ backgroundColor: "#060816" }}>
        <Toolbar sx={{ height: '64px', display: 'flex', justifyContent: 'space-between' }}>
          <img src={'/images/hsai_logo.jpg'} alt="Headstarter logo" style={{ height: '40px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
           
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#06cfb5',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                '&:hover': {
                  backgroundColor: '#05b8a2',
                },
                borderRadius: '4px',
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Stack
        direction={'column'}
        width="900px"
        height="700px"
        p={2}
        spacing={2}
        sx={{
          alignItems: 'center',  // Centers horizontally (in column direction)
          justifyContent: 'center',  // Centers vertically (in column direction)
        }}
      >
        <Typography variant="body1" color='white' alignSelf='flex-start'>
          Home &gt; Week 3 &gt; Finished Project
        </Typography>
        <Typography variant="h4" color='white' alignSelf='flex-start'>
          Project 3: AI Customer Support
        </Typography>
        <Typography variant="p" color='#727b8b' alignSelf='flex-start'>
          Our group built an AI-chatbot for our week #3 Headstarter AI Fellowship project! Take a look!
        </Typography>
        <Stack direction={'row'} spacing={1} alignSelf='flex-end'>
          {['Next.js', 'React', 'OpenAI', 'Vercel', 'Streaming', 'Pinecone'].map((tech, index) => (
            <Button
              key={index}
              variant="contained"
              disableRipple
              sx={{
                backgroundColor: '#092733', // Teal background
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '0.6rem',
                '&:hover': {
                  backgroundColor: '#092733',
                },
                border: '1px solid #06cfb5',
                borderRadius: '4px',
              }}
            >
              {tech}
            </Button>
          ))}
        </Stack>
        <Divider
          sx={{
            border: '2px solid #131b2b',
            width: '100%'
          }}
        />
        <Stack
          direction={'column'}
          width="700px"
          height="500px"
          bgcolor="#060816"
          border="2px solid #131b2b"
          borderRadius={2}
          p={2}
          spacing={2}
          alignContent="center" //this should be centered inside parent stack
        >
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
            style={{
              borderColor: '#131b2b',
              borderWidth: '2px',
              borderStyle: 'solid',
              marginY: 2,
              borderRadius: '8px',
              alignContent: 'center'
            }}
          >
            {messages.map((message, index) => (
              <Box
                p={1}
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? "#092733"
                      : '#06cfb5'
                  }
                  border="1px solid #06cfb5"
                  color="white"
                  borderRadius={2}
                  p={2}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              InputLabelProps={{
                style: { color: '#ffffff80' },
              }}
              sx={{
                borderRadius: '8px',
                border: '2px solid #131b2b',
                color: 'white',
                '& input': {
                  color: 'white', // Change input text color to white
                },
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? '#092733' : '#364ac9',
                borderRadius: '8px',
                border: '2px solid #364ac9',
                color: isLoading ? '#727b8b' : 'white'
              }}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}