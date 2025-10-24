import { FormEvent, ReactEventHandler, useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { login } from '../../store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateLoginForm } from '../../utils';
import LoginForm from '../../components/login-form/login-form';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { offersAction } from '../../store/slices/offers';

export type HTMLLoginForm = {
  email: string;
  password: string;
};

export type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function LoginScreen(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const handleChange: ChangeHandler = useCallback(
    (evt) => {
      const {name, value} = evt.currentTarget;
      setFormData({
        ...formData,
        [name]: value
      });
    }, [formData]
  );

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (validateLoginForm(formData)) {
        dispatch(login(formData));
      }
    }, [formData, dispatch]
  );

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm handleChange={handleChange} handleSubmit={handleSubmit}/>
          <ToastContainer/>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.Main}
              onClick={() => dispatch(offersAction.setCity('Amsterdam'))}
            >
              <span>
                Amsterdam
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
