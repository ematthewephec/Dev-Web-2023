import Cookies from 'js-cookie';
import {Nav} from 'react-bootstrap';

export const CookieGetter = ({ name }) => {
  const value = Cookies.get(name);
  return value;
};

export const CookieSetter = ({ name, value }) => {
  Cookies.set(name, value, {
    path: '/',
    sameSite: 'strict',
  });
  
  return null;
};

export const CookieRemover = ({ name }) => {
  Cookies.remove(name, {
    path: '/',
    sameSite: 'strict',
  });

  return null;
};