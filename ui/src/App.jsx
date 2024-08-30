import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../chart/header';
import Patrimoine from '../chart/patrimoine';
import CreatePossession from '../chart/createPossession';
import UpdatePossession from '../chart/updatePossession';
import LineChart from '../line/line';
import PossessionLIst from '../chart/listPossession';

function App() {
  return (
    <>
    <Header/>
      <Patrimoine/>
      <LineChart/>
      <PossessionLIst/>
      <CreatePossession/>
      <UpdatePossession/>
    </>
  )
}