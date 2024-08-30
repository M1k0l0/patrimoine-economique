import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdatePossession({ match }) {
  const [libelle, setLibelle] = useState(match.params.libelle);
  const [dateFin, setDateFin] = useState('');

  const handleSubmit = async () => {
    await axios.put("/possession/${libelle}", { dateFin });
    window.location.href = '/possession';
  };

  return (
    <div>
      <input type="text" value={libelle} disabled />
      <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UpdatePossession;