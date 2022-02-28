import './CardMore.scss';
import {ReactComponent as BlueArrowDown} from '../../svg/BlueArrowDown.svg';

export default function CardMore(): JSX.Element {
  return <button type="button" className="d-inline-flex align-items-center justify-content-center card-more">
    <BlueArrowDown/>
    <span className="card-more-text">Learn More</span>
  </button>;
}
