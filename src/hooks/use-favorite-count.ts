import { useEffect } from 'react';
import { favoritesSelectors } from '../store/slices/favorites';
import { useAppDispatch, useAppSelector } from './store';
import { RequestStatus } from '../const';
import { fetchFavorites } from '../store/api-actions';
import { useAuth } from './user-authorization';

export function useFavoriteCount() {
  const dispatch = useAppDispatch();
  const isAuthorized = useAuth();
  const count = useAppSelector(favoritesSelectors.favorites).length;
  const status = useAppSelector(favoritesSelectors.favoritesStatus);

  useEffect(() => {
    if (isAuthorized && status === RequestStatus.Idle) {
      dispatch(fetchFavorites());
    }
  }, [status, dispatch]);

  return count;
}
