import { FormEvent, ReactEventHandler, useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { login } from '../../store/api-actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type HTMLLoginForm = {
  email: string;
  password: string;
};

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const validateLoginForm = (data: HTMLLoginForm): boolean => {
  if (!data.email) {
    toast.error('Email обязателен');
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    toast.error('Некорректный формат email');
    return false;
  }

  if (!data.password) {
    toast.error('Пароль обязателен');
    return false;
  }

  if (!/(?=.*[a-zA-Z])/.test(data.password) || !/(?=.*\d)/.test(data.password)) {
    toast.error('Пароль должен содержать минимум одну букву и одну цифру');
    return false;
  }

  return true;
};

function LoginScreen(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const handleChange: ChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (validateLoginForm(formData)) {
      dispatch(login(formData));
    }
  }

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required onChange={handleChange}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required onChange={handleChange}/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
          <ToastContainer/>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
