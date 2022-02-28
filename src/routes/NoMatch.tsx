import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function NoMatch(): JSX.Element {
  let navigate = useNavigate();

  React.useEffect(() => {
    navigate('/register', { replace: true });
  });

  return <></>;
}
