import { useParams } from 'react-router-dom';
import { TOffers } from '../../components/offer-card/types';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Badge from '../../components/badge/badge';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferGoodsItem from '../../components/offer-goods-item/offer-goods-item';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import OfferCardList from '../../components/offer-card-list/offer-card-list';
import { AuthorizationStatus, MAX_VISIBLE_REVIEWS, RequestStatus } from '../../const';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { calcRating, getReverseAndSliceArray, ucFirst } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchComments, fetchNearOffers, fetchOffer } from '../../store/api-actions';
import { useEffect } from 'react';
import Loader from '../loading-screen/loading-screen';
import { offerSelectors } from '../../store/slices/offer';
import { reviewsSelectors } from '../../store/slices/reviews';


type OfferScreenProps = {
  authorizationStatus:AuthorizationStatus;
}

function OfferScreen({ authorizationStatus}: OfferScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  const currentOffer = useAppSelector(offerSelectors.offerDetails);
  const nearOffers = useAppSelector(offerSelectors.nearOffers).slice(0, 3);
  const offerLoadingStatus = useAppSelector(offerSelectors.statusOffer);
  const reviews = useAppSelector(reviewsSelectors.reviews);

  useEffect(() => {
    if (!id) {
      return;
    }
    Promise.all([
      dispatch(fetchOffer(id)),
      dispatch(fetchNearOffers(id)),
      dispatch(fetchComments(id)),
    ]);
  }, [id, dispatch]);

  if (offerLoadingStatus === RequestStatus.Loading) {
    return (
      <Loader/>
    );
  }

  if (offerLoadingStatus === RequestStatus.Failed || !currentOffer) {
    return <NotFoundScreen />;
  }
  const maxAdultsTitle = `Max ${currentOffer.maxAdults} ${currentOffer.maxAdults > 1 ? 'adults' : 'adult'}`;
  const bedroomsTitle = `${currentOffer.bedrooms} ${currentOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedrooms'}`;

  const ratingStyle = calcRating(currentOffer.rating);

  const currentCity = currentOffer.city;

  const nearOffersPlusCurrent: TOffers = [currentOffer, ...nearOffers];

  const visibleReviews = getReverseAndSliceArray(reviews, MAX_VISIBLE_REVIEWS);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.map((image) => (
              <div className="offer__image-wrapper" key={image}>
                <img
                  className="offer__image"
                  src={image}
                  alt="Photo studio"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer.isPremium && <Badge text='Premium' className='offer__mark' />}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer.title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <OfferRating rating={currentOffer.rating} ratingStyle={ratingStyle}/>

            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {ucFirst(currentOffer.type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedroomsTitle}
              </li>
              <li className="offer__feature offer__feature--adults">
                {maxAdultsTitle}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((good) => (<OfferGoodsItem good={good} key={good}/>))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={currentOffer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{currentOffer.host.name}</span>
                {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
              </h2>
              <ReviewsList reviews={visibleReviews}/>
              {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}
            </section>
          </div>
        </div>
        <Map type='offer' activeOffer={currentOffer} offers={nearOffersPlusCurrent} city={currentCity}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <OfferCardList offers={nearOffers} type='offerScreen'/>
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
