import './CardTag.scss';

export default function CardTag(props: any): JSX.Element {
  return <div className="d-inline-flex align-items-center card-tag">
    {props.children}
    <span className="card-tag-text">{props.text}</span>
  </div>;
}
