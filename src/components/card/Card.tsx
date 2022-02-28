import './Card.scss';
import {ReactComponent as StarFilled} from '../../svg/StarFilled.svg';
import {ReactComponent as StarOutline} from '../../svg/StarOutline.svg';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {ReactComponent as StopWatch} from '../../svg/StopWatch.svg';
import {ReactComponent as StartUp} from '../../svg/StartUp.svg';
import {ReactComponent as Like} from '../../svg/Like.svg';
import CardMore from './CardMore';
import CardTag from './CardTag';

export default function Card(props: any): JSX.Element {
  return <div className="card-container">
    <a href={props.url} target="_blank"><img src={props.imageUrl} alt="logo"/></a>
    <div className="d-flex justify-content-center card-star-list">
      <StarFilled/><StarFilled/><StarFilled/><StarFilled/><StarOutline/>
    </div>
    <div className="card-star-desc">95% customers recommend</div>
    <h3 className="card-sum">5.000.000 đ</h3>
    <div className="card-sum-desc">Repay 5,200,000 in 30 days *</div>
    <div className="card-sum-table">
      {[
        ['Interest Rate','15.84% /mo'],
        ['Maximum amount','15,000,000'],
        ['Money dispatch', 'up to 24h']
      ].map((sumTableItem, index) => {
        return <div className="d-flex justify-content-between" key={index}>
          <div>{sumTableItem[0]}</div>
          <div className="fw-bold">{sumTableItem[1]}</div>
        </div> ;
      })}
    </div>
    <Button variant="primary" type="button" className="custom-button">Apply in 10 minutes</Button>
    <div className="card-interest">0% Interest on the first loan</div>
    <div className="d-flex align-items-center justify-content-center card-decision">
      <StopWatch className="icon-stop-watch"/>Get decision in 1 hour
    </div>
    <div className="d-flex justify-content-between card-tags">
      <CardTag text="Fast Reply"><StartUp/></CardTag>
      <CardTag text="Recommended for you"><Like/></CardTag>
    </div>
    <div className="d-flex justify-content-center card-more-section">
      <CardMore/>
    </div>
  </div>;
}
