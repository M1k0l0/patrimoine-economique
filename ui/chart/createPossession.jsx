import React, { useState } from 'react';
import axios from 'axios';

function CreatePossession() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [taux, setTaux] = useState('');

  const handleSubmit = async () => {
    await axios.post('/possession', { libelle, valeur, dateDebut, taux });
    window.location.href = '/possession';
  };

  return (
    <div>
      <input type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)} placeholder="Libelle" />
      <input type="number" value={valeur} onChange={(e) => setValeur(e.target.value)} placeholder="Valeur" />
      <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
      <input type="number" value={taux} onChange={(e) => setTaux(e.target.value)} placeholder="Taux" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreatePossession;