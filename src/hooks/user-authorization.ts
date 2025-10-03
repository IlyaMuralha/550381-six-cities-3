import { AuthorizationStatus } from '../const';
import { useAppSelector } from './store';

export function useAuth() {
  const status = useAppSelector((state) => state.user.status);
  return status === AuthorizationStatus.Auth;
}
