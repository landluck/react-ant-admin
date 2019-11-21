import cookie from 'js-cookie';
import config from '../config';

export const setToken = (token: string) => cookie.set(config.TOKEN_KEY, token);

export const getToken: () => string = () => cookie.get(config.TOKEN_KEY) || '';

export const removeToken = () => cookie.remove(config.TOKEN_KEY);
