import OfferCardList from '../../components/offer-card-list/offer-card-list';
import { useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector(offersSelectors.offers);

  const savedOffers = offers.filter((offer) => offer.isFavorite);
  const savedCities:string[] = [];
  savedOffers.forEach((offer) => {
    savedCities.push(offer.city.name);
  });

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
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
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
