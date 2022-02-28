import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';
import { Card } from '../../components';
import './Offers.scss';

export default function Offers(): JSX.Element {
  const { search } = useLocation();
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!(new URLSearchParams(search)).get('customer-id')) {
      navigate('/login', { replace: true });
    }
  }, [search]);

  const {data} = useQuery(gql`
    query {
      fetchOffers(customerId: "${(new URLSearchParams(search)).get('customer-id')}") {
        url,
        imageUrl
      }
    }
  `);
  const [offers, setOffers] = React.useState([])
  React.useEffect(() => {
    if (data) {
      setOffers(data.fetchOffers);
    }
  }, [data]);
  return (
    <div className="container-jf">
      <h4 className="offers-title">
        <span className="offers-title-bold">{offers.length} personalised</span> results found based on the information you’ve provided
      </h4>
      <div className="offers-section">
        <div className="offers-section-head d-flex align-items-center">
          <h5 className="offers-section-title">Best offers</h5>
          <div className="offers-section-delimiter">{/**/}</div>
        </div>
        <div className={'offers-grid d-flex flex-wrap align-items-start ' + (offers.length > 2 ? 'justify-content-between' : '')}>{offers.map((offer, index) => {
          return <Card key={index} {...offer} /> ;
        })}</div>
      </div>
      <div className="offers-section">
        <div className="offers-section-head d-flex align-items-center">
          <h5 className="offers-section-title">Recommended</h5>
          <div className="offers-section-delimiter">{/**/}</div>
        </div>
        <div className={'offers-grid d-flex flex-wrap align-items-start ' + (offers.length > 2 ? 'justify-content-between' : '')}>{offers.map((offer, index) => {
          return <Card key={index} {...offer} /> ;
        })}</div>
      </div>
    </div>
  );
}
