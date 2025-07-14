import React, { useState } from 'react';
import axios from 'axios';

const Card = () => {
  const [dailyCard, setDailyCard] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDailyCard = async () => {
    const today = new Date().toDateString();
    const lastDrawDate = localStorage.getItem('lastCardDrawDate');

    if (lastDrawDate === today) {
      setError("🔒 You’ve already drawn your Card of the Day! Try again tomorrow.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/tarot/random');
      const card = response.data;
      setDailyCard(card);
      localStorage.setItem('lastCardDrawDate', today);
    } catch (err) {
      setError("❌ Failed to fetch your card. Is your Tarot API running?");
      console.error(err.message);
    }
    setLoading(false);
  };

  const resetDraw = () => {
    localStorage.removeItem('lastCardDrawDate');
    setDailyCard(null);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="card text-center bg-light shadow-sm p-4">
        <h3 className="mb-3">🔮 Your Card of the Day</h3>
        <img
          src="https://placehold.co/400x200?text=Tarot+Card"
          className="card-img-top mx-auto"
          style={{ maxWidth: "400px" }}
          alt="Card"
        />
        <div className="card-body">
          <p className="card-text mb-3">Click below to reveal your guidance for today:</p>
          <button onClick={handleDailyCard} className="btn btn-dark me-2" disabled={loading}>
            {loading ? "Drawing..." : "Draw Card"}
          </button>
          <button onClick={resetDraw} className="btn btn-outline-secondary">Reset</button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>

      {dailyCard && (
        <div className="card mt-4 shadow">
          <div className="card-header bg-info text-white">
            <h5>{dailyCard.name}</h5>
            <small>{dailyCard.arcana}{dailyCard.suit ? ` (${dailyCard.suit})` : ''}</small>
          </div>
          <div className="card-body">
            <p><strong>Upright:</strong> {dailyCard.uprightMeaning}</p>
            <p><strong>Reversed:</strong> {dailyCard.reversedMeaning}</p>
            <p><strong>Symbols:</strong> {dailyCard.symbolism.join(', ')}</p>
            <p><strong>Numerology:</strong> {dailyCard.numerology}</p>
            <p><strong>Keywords:</strong> {dailyCard.keywords.join(', ')}</p>
            <p><strong>Description:</strong> {dailyCard.description}</p>
            <p><strong>Advice:</strong> {dailyCard.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
