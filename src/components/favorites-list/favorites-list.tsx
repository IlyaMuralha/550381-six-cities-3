import { useAppSelector } from '../../hooks/store';
import { favoritesSelectors } from '../../store/slices/favorites';
import OfferCardList from '../offer-card-list/offer-card-list';

function FavoritesList(): JSX.Element {

  const savedOffers = useAppSelector(favoritesSelectors.favorites);
  const savedCities:string[] = [];
  savedOffers.forEach((offer) => {
    savedCities.push(offer.city.name);
  });
  return (
    <ul className="favorites__list">
      {[...new Set(savedCities)].map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <OfferCardList offers={savedOffers.filter((offer) => offer.city.name === city)} type='favoriteScreen'/>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
