import React, { useState, useEffect } from 'react';

import './table.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [organisations, setSpecies] = useState();

  async function fetchData() {
    const baseUrl = process.env.REACT_APP_API_URL || 'https://localhost:5000';
    const res = await fetch(`${baseUrl}/api/v1/organisation/?page=1`);
    res
      .json()
      .then((json) => {
        setSpecies(json.organisations);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(
    () => {
      fetchData();
    },
    // eslint-disable-next-line
    []
  );

  if (isLoading) {
    return (
      <>
        <div className="container">
          <h1>Organisations!</h1>
          <p>Loading organisations...</p>
        </div>
      </>
    );
  }

  const renderRows = () => {
    return organisations.map((organisation) => {
      const { name, type, status, owner } = organisation;
      return (
        <li className="table-row" key={name}>
          <div className="col col-1">{name}</div>
          <div className="col col-2">{type}</div>
          <div className="col col-3">{status}</div>
          <div className="col col-4">{owner.first_name}</div>
        </li>
      );
    });
  };

  return (
    <>
      <div className="container">
        <h1>Star Wars Species!</h1>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-2">Type</div>
            <div className="col col-3">Status</div>
            <div className="col col-4">Owner Name</div>
          </li>
          {renderRows()}
        </ul>
      </div>
    </>
  );
};

export default Home;
