import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/logo.svg';



function Header({ userEmail, deleteToken, isLoggedIn }) {

  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo"
          alt="Место Россия"
          src={logo} />


        {isLoggedIn ? (
          <>
            <div className="header__info">
              <p className="header__text header__text-email">
                {userEmail}
              </p>
              <button
                className="header__button header__button_logout"
                onClick={deleteToken}
              >
                {'Выйти'}
              </button>
            </div>
          </>
        ) : (
          <>
            {location.pathname === "/sign-up" ? (
              <Link
                className="header__button"
                to="/sign-in"
              >
                {'Войти'}
              </Link>
            ) : (
              <Link
                className="header__button"
                to="/sign-up"
              >
                {'Регистрация'}
              </Link>
            )}
          </>
        )}

        { }
      </div>

    </header>
  )
}

export default Header;