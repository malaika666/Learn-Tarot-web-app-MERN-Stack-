import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Learn = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/tarot')
      .then(res => {
        setCards(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tarot cards:", error);
        setLoading(false);
      });
  }, []);

useEffect(() => {
  const scrollTo = location.state?.scrollTo || window.location.hash.replace('#', '');

  if (scrollTo) {
    setTimeout(() => {
      const section = document.getElementById(scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }
}, [location, cards]);


  useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    // Delay until cards are loaded into the DOM
    const scrollToHash = () => {
      const section = document.querySelector(hash);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    };
    // Give time for rendering
    setTimeout(scrollToHash, 300);
  }
}, [cards]);



  const handleCardClick = (card) => setSelectedCard(card);
  const handleCloseModal = () => setSelectedCard(null);

  const majorCards = cards.filter(card => card.arcana.toLowerCase() === 'major');
  const minorCards = cards.filter(card => card.arcana.toLowerCase() === 'minor');

  if (loading) return <p className="text-center mt-5">🔮 Loading cards...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-5">🃏 Explore All 78 Tarot Cards</h2>

      {/* 🌞 Major Arcana */}
      <section id="major" className="mb-5">
        <h3 className="text-info">🌞 Major Arcana</h3>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {majorCards.map((card, index) => (
            <div className="col" key={index}>
              <div
                className="card shadow-sm h-100"
                onClick={() => handleCardClick(card)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p><strong>Upright:</strong> {card.uprightMeaning}</p>
                  <p><strong>Reversed:</strong> {card.reversedMeaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌙 Minor Arcana */}
      <section id="minor">
        <h3 className="text-warning">🌙 Minor Arcana</h3>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {minorCards.map((card, index) => (
            <div className="col" key={index}>
              <div
                className="card shadow-sm h-100"
                onClick={() => handleCardClick(card)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="text-muted">({card.suit})</p>
                  <p><strong>Upright:</strong> {card.uprightMeaning}</p>
                  <p><strong>Reversed:</strong> {card.reversedMeaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔍 Modal */}
      {selectedCard && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCard.name}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Arcana:</strong> {selectedCard.arcana} {selectedCard.suit ? `(${selectedCard.suit})` : ''}</p>
                <p><strong>Upright:</strong> {selectedCard.uprightMeaning}</p>
                <p><strong>Reversed:</strong> {selectedCard.reversedMeaning}</p>
                <p><strong>Keywords:</strong> {selectedCard.keywords?.join(', ')}</p>
                <p><strong>Symbolism:</strong> {selectedCard.symbolism?.join(', ')}</p>
                <p><strong>Numerology:</strong> {selectedCard.numerology}</p>
                <p><strong>Description:</strong> {selectedCard.description}</p>
                <p><strong>Advice:</strong> {selectedCard.advice}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
