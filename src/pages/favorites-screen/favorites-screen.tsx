import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks/store';
import { favoritesSelectors } from '../../store/slices/favorites';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(favoritesSelectors.favorites);
  const hasFavorites = favorites.length > 0;

  if (hasFavorites) {
    return (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList />
          </section>
        </div>
      </main>
    );
  }

  return <FavoritesEmpty />;

}

export default FavoritesScreen;
