import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary fw-bold">✨ Welcome to Your Tarot Journey ✨</h1>
      <p className="text-center text-muted mb-5">
        Learn the meanings of all 78 cards, discover daily guidance, and unlock your intuition 🔮
      </p>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Major Arcana */}
        <div className="col">
          <div
            className="card h-100 bg-light shadow-sm border-0"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/learn', { state: { scrollTo: 'major' } })}
          >
            <img
              src="https://placehold.co/400x200?text=Major+Arcana"
              className="card-img-top"
              alt="Major Arcana"
            />
            <div className="card-body">
              <h5 className="card-title text-info">🌞 Major Arcana</h5>
              <p className="card-text">
                Explore life's big lessons and spiritual themes with the 22 Major Arcana cards.
              </p>
              <button className="btn btn-outline-info">Explore Major</button>
            </div>
          </div>
        </div>

        {/* Minor Arcana */}
        <div className="col">
          <div
            className="card h-100 bg-light shadow-sm border-0"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/learn', { state: { scrollTo: 'minor' } })}
          >
            <img
              src="https://placehold.co/400x200?text=Minor+Arcana"
              className="card-img-top"
              alt="Minor Arcana"
            />
            <div className="card-body">
              <h5 className="card-title text-warning">🌙 Minor Arcana</h5>
              <p className="card-text">
                Dive into daily situations and emotions with the 56 Minor Arcana cards.
              </p>
              <button className="btn btn-outline-warning">Explore Minor</button>
            </div>
          </div>
        </div>

        {/* Card of the Day */}
        <div className="col">
          <div
            className="card h-100 bg-light shadow-sm border-0"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/card')}
          >
            <img
              src="https://placehold.co/400x200?text=Card+of+the+Day"
              className="card-img-top"
              alt="Card of the Day"
            />
            <div className="card-body">
              <h5 className="card-title text-success">🌟 Card of the Day</h5>
              <p className="card-text">
                Reveal your card for today and get personal guidance from the universe.
              </p>
              <button className="btn btn-outline-success">Draw My Card</button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5 text-muted">
        <p>💫Made with love</p>
      </div>
    </div>
  );
};

export default Home;
