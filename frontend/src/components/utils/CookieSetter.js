import React from 'react';
import { useCookies } from 'react-cookie';

export const CookieSetter = ({ name, value }) => {
    const [cookies, setCookie] = useCookies([name]);
  
    setCookie(name, value, {
      path: '/',
      sameSite: 'strict',
    });
  
    return null;
};