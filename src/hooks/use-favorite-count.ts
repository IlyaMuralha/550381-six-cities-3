import { useEffect } from 'react';
import { favoritesSelectors } from '../store/slices/favorites';
import { useAppDispatch, useAppSelector } from './store';
import { RequestStatus } from '../const';
import { fetchFavorites } from '../store/api-actions';

export function useFavoriteCount() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(favoritesSelectors.favorites).length;
  const status = useAppSelector(favoritesSelectors.favoritesStatus);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      dispatch(fetchFavorites());
    }
  }, [status, dispatch]);

  return count;
}
