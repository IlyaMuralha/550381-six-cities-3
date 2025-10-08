import OfferCardList from '../../components/offer-card-list/offer-card-list';
import NavTabs from '../../components/nav-tabs/nav-tabs';
import Map from '../../components/map/map';
import SortForm from '../../components/sort-form/sort-form';
import { TOffer } from '../../components/offer-card/types';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useCallback, useEffect, useState } from 'react';
import { getSortedOffers } from '../../utils';
import Empty from '../../components/empty/empty';
import { CITIES, RequestStatus } from '../../const';
import Loader from '../loading-screen/loading-screen';
import { fetchOfferAction } from '../../store/api-actions';
import ErrorMessage from '../../components/error-message/error-message';
import { offersSelectors } from '../../store/slices/offers';

function MainScreen(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<TOffer | undefined>(undefined);
  const [failedFetch, setFailedFetch] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction())
      .unwrap()
      .then(() => setFailedFetch(false))
      .catch(() => setFailedFetch(true));
  }, []);

  const handleOfferHover = useCallback((offer?: TOffer): void => {
    setActiveOffer(offer);
  }, []);

  const OffersLoadingStatus = useAppSelector((state) => state.offers.status);
  const offers = useAppSelector(offersSelectors.offers);
  const initialCity = useAppSelector(offersSelectors.city);
  const activeSort = useAppSelector(offersSelectors.activeSort);

  if (failedFetch) {
    return (
      <ErrorMessage>Что-то пошло не так, перезагрузите страницу</ErrorMessage>
    );
  }

  if (OffersLoadingStatus === RequestStatus.Loading) {
    return (
      <Loader/>
    );
  }

  const currentOffers = offers.filter((offer) => offer.city.name === initialCity);
  const currentCity = CITIES.filter((city) => city.name === initialCity)[0];
  const offerCardCount = currentOffers.length;
  const sortedOffers = getSortedOffers(currentOffers, activeSort);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <NavTabs currentCity={initialCity}/>
      {offerCardCount === 0 ? (
        <Empty city={initialCity}/>
      ) : (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerCardCount} places to stay in {initialCity}</b>
              <SortForm />
              <OfferCardList offers={sortedOffers} type='mainScreen' handleHover={handleOfferHover}/>
            </section>
            <div className="cities__right-section">
              <Map type='main' activeOffer={activeOffer} offers={currentOffers} city={currentCity}/>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default MainScreen;
