import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function Patrimoine() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [jour, setJour] = useState('');
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await axios.post('/patrimoine/range', {
      type: 'month',
      dateDebut,
      dateFin,
      jour,
    });
    setData(response.data);
  };

  return (
    <div>
      <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
      <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
      <select value={jour} onChange={(e) => setJour(e.target.value)}>
        <option value="">Select Jour</option>
        {/* Ajouter options */}
      </select>
      <button onClick={fetchData}>Validate</button>
      <Line data={data} />
    </div>
  );
}

export default Patrimoine;