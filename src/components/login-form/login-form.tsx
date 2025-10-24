import { FormEvent } from 'react';
import { ChangeHandler } from '../../pages/login-screen/login-screen';

export type LoginFormProps = {
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  handleChange: ChangeHandler;
}

function LoginForm({handleSubmit, handleChange}: LoginFormProps): JSX.Element {
  return (
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
  );
}

export default LoginForm;
