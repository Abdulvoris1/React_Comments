import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/COMMENTS.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (!data) return <p>Error loading data.</p>;

  const rows = [];
  for (let i = 0; i < data.length; i += 2) {
    const first = data[i];
    const second = data[i + 1];

    const isEvenRow = (i / 2) % 2 !== 0;

    rows.push(
      <div className="row" key={i}>
        {isEvenRow ? (
          <>
            <Comment data={first} size="small" />
            {second && <Comment data={second} size="large" />}
          </>
        ) : (
          <>
            {second && <Comment data={second} size="large" />}
            <Comment data={first} size="small" />
          </>
        )}
      </div>
    );
  }

  return <div className="container">{rows}</div>;
}

function Comment({ data, size }) {
  if (!data) return null;
  return (
    <div className={`comment ${size}`}>
      <img src={data.img} alt={data.name} />
      <div>
        <h3>{data.name}</h3>
        <p>{data.comment}</p>
      </div>
    </div>
  );
}

export default App;

