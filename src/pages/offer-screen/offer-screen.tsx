import { useParams } from 'react-router-dom';
import { TOffer, TOfferDetails } from '../../components/offer-card/types';
import { TReview } from '../../components/review/types';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Badge from '../../components/badge/badge';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferGoodsItem from '../../components/offer-goods-item/offer-goods-item';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import OfferCardList from '../../components/offer-card-list/offer-card-list';
import { AuthorizationStatus } from '../../const';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { calcRating } from '../../utils';
import { useAppSelector } from '../../hooks/store';


type OfferScreenProps = {
  reviews: TReview[];
  authorizationStatus:AuthorizationStatus;
}

function OfferScreen({ authorizationStatus, reviews}: OfferScreenProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers.offers);
  const {id} = useParams();
  const currentOffer: TOfferDetails | undefined = offers.find((offer: TOfferDetails) => offer.id === id);

  if (!currentOffer) {
    return <NotFoundScreen />;
  }
  const maxAdultsTitle = `Max ${currentOffer.maxAdults} ${currentOffer.maxAdults > 1 ? 'adults' : 'adult'}`;
  const bedroomsTitle = `${currentOffer.bedrooms} ${currentOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedrooms'}`;

  const ratingStyle = calcRating(currentOffer.rating);

  const currentCity = currentOffer.city;
  const nearOffers: TOffer[] = offers.filter((offer) => offer.city.name === currentCity.name);

  const nearOffersPlusCurrent: TOffer[] = [currentOffer, ...nearOffers];

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
                {currentOffer.type}
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
                    src="img/avatar-angelina.jpg"
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">Angelina</span>
                <span className="offer__user-status">Pro</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a a river by
                  the unique lightness of Amsterdam. The building is green and
                  from 18th century.
                </p>
                <p className="offer__text">
                  An independent House, strategically located between Rembrand
                  Square and National Opera, but where the bustle of the city
                  comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
              </h2>
              <ReviewsList reviews={reviews}/>
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
