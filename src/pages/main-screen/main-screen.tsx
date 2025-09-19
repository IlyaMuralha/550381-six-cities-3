import OfferCardList from '../../components/offer-card-list/offer-card-list';
import NavTabs from '../../components/nav-tabs/nav-tabs';
import Map from '../../components/map/map';
import SortForm from '../../components/sort-form/sort-form';
import { TOffer } from '../../components/offer-card/types';

type MainScreenProps = {
  offers: TOffer[];
  activeOffer: TOffer | undefined;
  handleHover?: (offer?: TOffer) => void;
}

function MainScreen({offers, handleHover, activeOffer}: MainScreenProps): JSX.Element {
  const currentCity = offers[0].city;
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  const offerCardCount = currentOffers.length;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <NavTabs />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offerCardCount} places to stay in {currentCity.name}</b>
            <SortForm />

            <OfferCardList offers={currentOffers} type='mainScreen' handleHover={handleHover}/>

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
