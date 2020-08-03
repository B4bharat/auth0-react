/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../auth/react-auth0-spa';

import './table.css';

const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [branches, setBranches] = useState();
  const { getTokenSilently } = useAuth0();

  const fetchData = async () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'https://localhost:5000';

    const token = await getTokenSilently();

    const res = await fetch(`${baseUrl}/api/v1/branch/?page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res
      .json()
      .then((json) => {
        setBranches(json.branches);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

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
          <h1>Star Wars Characters!</h1>
          <p>Loading People...</p>
        </div>
      </>
    );
  }

  const renderRows = () => {
    return branches.map((branch) => {
      const { org_name, org_type, name, address, contact } = branch;
      return (
        <li className="table-row" key={name}>
          <div className="col col-1">{org_name}</div>
          <div className="col col-2">{address}</div>
          <div className="col col-3">{contact}</div>
          <div className="col col-4">{name}</div>
          <div className="col col-5">{org_type}</div>
        </li>
      );
    });
  };

  return (
    <>
      <div className="container">
        <h1>Star Wars Characters!</h1>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Organisation Name</div>
            <div className="col col-2">Address</div>
            <div className="col col-3">Contact</div>
            <div className="col col-4">Name</div>
            <div className="col col-5">Organisation Type</div>
          </li>
          {renderRows()}
        </ul>
      </div>
    </>
  );
};

export default People;
