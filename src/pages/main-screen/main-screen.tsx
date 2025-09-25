import OfferCardList from '../../components/offer-card-list/offer-card-list';
import NavTabs from '../../components/nav-tabs/nav-tabs';
import Map from '../../components/map/map';
import SortForm from '../../components/sort-form/sort-form';
import { TOffer } from '../../components/offer-card/types';
import { useAppSelector } from '../../hooks/store';
import { useState } from 'react';
import { PLACES_OPTIONS } from '../../const';

function MainScreen(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<TOffer | undefined>(undefined);
  const [activeSort, setActiveSort] = useState(PLACES_OPTIONS[0]);

  const handleOfferHover = (offer?: TOffer) => {
    setActiveOffer(offer);
  };

  const offers = useAppSelector((state) => state.offers);
  const initialCity = useAppSelector((state) => state.city);
  const currentOffers = offers.filter((offer) => offer.city.name === initialCity);
  const currentCity = currentOffers[0].city;
  const offerCardCount = currentOffers.length;

  let sortedOffers = currentOffers;

  switch (activeSort) {
    case PLACES_OPTIONS[1]:
      sortedOffers = currentOffers.toSorted((a, b) => a.price - b.price);
      break;
    case PLACES_OPTIONS[2]:
      sortedOffers = currentOffers.toSorted((a, b) => b.price - a.price);
      break;
    case PLACES_OPTIONS[3]:
      sortedOffers = currentOffers.toSorted((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <NavTabs currentCity={currentCity}/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offerCardCount} places to stay in {currentCity.name}</b>
            <SortForm activeSort={activeSort} setActiveSort={setActiveSort}/>

            <OfferCardList offers={sortedOffers} type='mainScreen' handleHover={handleOfferHover}/>

          </section>
          <div className="cities__right-section">
            <Map type='main' activeOffer={activeOffer} offers={currentOffers} city={currentCity}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
