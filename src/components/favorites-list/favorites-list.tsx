import { useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';
import OfferCardList from '../offer-card-list/offer-card-list';

function FavoritesList(): JSX.Element {
  const offers = useAppSelector(offersSelectors.offers);

  const savedOffers = offers.filter((offer) => offer.isFavorite);
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
