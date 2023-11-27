import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
      <div className="App">
        <h1>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here"
              required
          />
          <button type="submit">Shorten URL</button>
        </form>
        {shortenedUrl && <p>Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a></p>}
      </div>
  );
}

export default App;
