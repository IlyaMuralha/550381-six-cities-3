import { Navigate, useLocation, Location } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { ReactNode } from 'react';
import { userSelectors } from '../../store/slices/user';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

type FromState = {
  from?:Location;
}

export default function ProtectedRoute({children, onlyUnAuth}: ProtectedRouteProps) {
  const location: Location<FromState> = useLocation() as Location<FromState>;

  const user = useAppSelector(userSelectors.user);

  if (onlyUnAuth && user) {
    const from = location.state?.from || {pathname: AppRoute.Main};
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate state={{from: location}} to={AppRoute.Login} />;
  }

  return children;
}
