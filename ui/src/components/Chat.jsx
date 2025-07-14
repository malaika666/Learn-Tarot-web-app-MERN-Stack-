import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Try fetching card from Tarot API with case-insensitive search
      const cardName = input.trim().toLowerCase();
      const cardResponse = await axios.get('http://localhost:5000/api/tarot');
      const card = cardResponse.data.find(
        (c) => c.name.toLowerCase() === cardName
      );

      if (card) {
        const botMessage = {
          sender: 'bot',
          text: `
            **${card.name}** (${card.arcana} Arcana${card.suit ? `, ${card.suit}` : ''}):
            - **Upright Meaning**: ${card.uprightMeaning}
            - **Reversed Meaning**: ${card.reversedMeaning}
            - **Symbolism**: ${card.symbolism.join(', ')}
            - **Numerology**: ${card.numerology}
            - **Keywords**: ${card.keywords.join(', ')}
            - **Description**: ${card.description}
            - **Advice**: ${card.advice}
          `,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Predefined responses for common tarot questions
        let botMessage;
        const query = input.toLowerCase();
        if (query.includes('major arcana')) {
          botMessage = {
            sender: 'bot',
            text: 'The Major Arcana consists of 22 cards representing major life events and spiritual lessons, such as The Fool, The Magician, and The World. Try asking about a specific card!',
          };
        } else if (query.includes('minor arcana')) {
          botMessage = {
            sender: 'bot',
            text: 'The Minor Arcana consists of 56 cards divided into four suits (Wands, Cups, Swords, Pentacles), representing everyday events and experiences. Want details on a specific suit or card?',
          };
        } else if (query.includes('tarot spread')) {
          botMessage = {
            sender: 'bot',
            text: 'A tarot spread is a layout of cards drawn to gain insight on specific questions or situations. Popular spreads include the Celtic Cross and Three-Card Spread. Ask about a specific spread or card!',
          };
        } else if (query.includes('how to read tarot')) {
          botMessage = {
            sender: 'bot',
            text: 'To read tarot, shuffle the deck while focusing on your question, draw cards based on a spread, and interpret their meanings (upright or reversed) in context. Each card’s position in the spread adds nuance. Try asking about a specific card to learn more!',
          };
        } else {
          botMessage = {
            sender: 'bot',
            text: `I couldn't find a card named "${input}". Try a specific card like "The Fool" or ask about the Major Arcana, Minor Arcana, tarot spreads, or how to read tarot!`,
          };
        }
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const botMessage = {
        sender: 'bot',
        text: 'Sorry, something went wrong. Please ensure the Tarot API is running and try again with a card name like "The Fool" or a general tarot question!',
      };
      setMessages((prev) => [...prev, botMessage]);
      console.error('Error:', error.message);
    }
    setLoading(false);
  };

  const handleRandomCard = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/tarot/random');
      const card = response.data;
      const botMessage = {
        sender: 'bot',
        text: `
          **Your Random Card: ${card.name}** (${card.arcana} Arcana${card.suit ? `, ${card.suit}` : ''}):
          - **Upright Meaning**: ${card.uprightMeaning}
          - **Reversed Meaning**: ${card.reversedMeaning}
          - **Symbolism**: ${card.symbolism.join(', ')}
          - **Numerology**: ${card.numerology}
          - **Keywords**: ${card.keywords.join(', ')}
          - **Description**: ${card.description}
          - **Advice**: ${card.advice}
        `,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        sender: 'bot',
        text: 'Error fetching a random card. Please ensure the Tarot API is running and try again!',
      };
      setMessages((prev) => [...prev, botMessage]);
      console.error('Error:', error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">🔮 Tarot Chatbot</h2>
      <div className="card shadow-sm">
        <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}
            >
              <span
                className={`badge ${msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'} p-2`}
                style={{ maxWidth: '80%', display: 'inline-block', whiteSpace: 'pre-wrap' }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="card-footer">
          <div className="input-group">
            <button
              className="btn btn-secondary"
              onClick={handleRandomCard}
              disabled={loading}
            >
              Draw Random Card
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Ask about a card (e.g., The Fool) or tarot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="btn btn-primary"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;