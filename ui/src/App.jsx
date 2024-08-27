import { useRef, useState, useEffect } from "react";
import { Table, Container, Card, Form, Button, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flux from "../../models/possessions/Flux";
import Possession from "../../models/possessions/Possession";
import data from "../../data/data.json";

function PossessionLIst(){
    const [initialDate, setInitialDate] = useState(new Date().toISOString().split('T')[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [possessions, setPossessions] = useState([]);
    const [flux, setFlux] = useState([]);
    const [finalValues, setFinalValues] = useState([]);
  
    useEffect(() => {
      const dataName = data.find(el => el.model === 'Patrimoine').data.possessions;
      const fluxData = [];
      const possessionData = [];
  
      dataName.forEach(item => {
        if (item.valeurConstante !== undefined) {
          fluxData.push(new Flux(
            item.possesseur.nom,
            item.libelle,
            item.valeurConstante,
            new Date(item.dateDebut),
            item.dateFin ? new Date(item.dateFin) : null,
            item.tauxAmortissement,
            item.jour
          ));
        } else {
          possessionData.push(new Possession(
            item.possesseur.nom,
            item.libelle,
            item.valeur,
            new Date(item.dateDebut),
            item.dateFin ? new Date(item.dateFin) : null,
            item.tauxAmortissement,
          ));
        }
      });
  
      setPossessions(possessionData);
      setFlux(fluxData);
    }, []);
  
    const handleChangeDate = (ev) => {
      setInitialDate(ev.target.value);
    };
  
    const handleCalculate = () => {
      const newDate = new Date(initialDate);
      setDate(newDate);
  
      const values = {};
  
      possessions.forEach(possession => {
        const result = possession.getValeur(newDate);
        values[possession.libelle] = (values[possession.libelle] || 0) + result;
      });
  
      flux.forEach(fluxData => {
        const result = fluxData.getValeur(newDate);
        values[fluxData.libelle] = (values[fluxData.libelle] || 0) + result;
      });
  
      const array = Object.keys(values).map(libelle => ({
        libelle,
        valeur: values[libelle]
      }));
  
      setFinalValues(array);
    };
  
    return (
      <>
        <Container className="my-4">
          <h1 className="mb-4 text-center">Liste des Possessions</h1>
          <Card className="mb-4 background-section">
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Possesseur</th>
                    <th>Libelle</th>
                    <th>Valeur</th>
                    <th>Date de debut</th>
                    <th>Date de fin</th>
                    <th>Taux d'amortissement</th>
                    <th>Valeur actuelle</th>
                  </tr>
                </thead>
                <tbody>
                  {possessions.concat(flux).map((element, index) => (
                    <tr key={index}>
                      <td>John Doe</td>
                      <td>{element.libelle}</td>
                      <td>{element.valeur || 'Null'}</td>
                      <td>{element.dateDebut.toISOString().split('T')[0]}</td>
                      <td>{element.dateFin ? element.dateFin.toISOString().split('T')[0] : 'Null'}</td>
                      <td>{element.tauxAmortissement || 'Null'}</td>
                      <td>{element.getValeur(new Date())}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
        <Container className="containe-all">
          <div className="patrimoine">
            <h2>Select a date</h2>
            <Form.Control type="date" onChange={handleChangeDate} />
            <Button onClick={handleCalculate}>Calculate values</Button>
          </div>
          <Row className="values">
            <div className="mt-4">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Libelle</th>
                    <th>Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  {finalValues.map((finalValue, index) => (
                    <tr key={index}>
                      <td>{finalValue.libelle}</td>
                      <td>{finalValue.valeur.toFixed(2)} ariary</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        </Container>
      </>
    );
}

function App() {
  return(
    <PossessionLIst/>
  )
}

export default App;