import { selectRouter } from 'app/global-stores/router/selectors';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

export function ReduxRouterConnector({ children }: Props) {
  const { counter, action, param } = useSelector(selectRouter);
  const navigate = useNavigate();

  // Router action handler
  useEffect(() => {
    if (action === 'push') {
      navigate(param);
    } else if (action === 'replace') {
      navigate(param, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return <>{children}</>;
}
