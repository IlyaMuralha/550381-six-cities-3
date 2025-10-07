import { Fragment, useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { postComment } from '../../store/api-actions';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CHARACTERS = {
  min: 50,
  max: 300
};

const rating = [
  {value: '5', label: 'perfect'},
  {value: '4', label: 'good'},
  {value: '3', label: 'not bad'},
  {value: '2', label: 'badly'},
  {value: '1', label: 'terribly'}
];

function ReviewsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const [review, setReview] = useState({rating: '0', comment: ''});

  const handleChangeReview = (evt:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setReview({...review, [name]: value});
  };

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();

    if (!id) {
      throw new Error('id не найден');
    }

    dispatch(postComment({
      offerId: id,
      comment: review.comment,
      rating: Number(review.rating)
    }))
      .unwrap()
      .then(() => setReview({rating: '0',comment: ''}))
      .catch(() => toast.error('Не удалось отправить комментарий'));
  }

  return (
    <>
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <label
          className="reviews__label form__label"
          htmlFor="review"
        >
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {rating.map(({value, label}) => (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                onChange={handleChangeReview}
                checked={value === review.rating}
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={label}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="comment"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={review.comment}
          onChange={handleChangeReview}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe
            your stay with at least{' '}
            <b className="reviews__text-amount">{CHARACTERS.min} characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={review.rating === '0' || review.comment.length < CHARACTERS.min || review.comment.length > CHARACTERS.max}
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
}

export default ReviewsForm;
