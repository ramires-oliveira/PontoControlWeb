const TOKEN_KEY = "auth_token";
const TOKEN_EXPIRATION_KEY = "token_expiration";

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthTokenExpiration = () => {
  const expirationTime = new Date().getTime() + 60 * 60 * 1000;
  localStorage.setItem(TOKEN_EXPIRATION_KEY, expirationTime.toString());
};

export const isTokenExpired = () => {
  const token = getAuthToken();
  const expiration = localStorage.getItem(TOKEN_EXPIRATION_KEY);

  if (token && expiration) {
    const expirationTime = parseInt(expiration);
    if (new Date().getTime() < expirationTime) {
      return { token, expirationTime };
    }
  }

  // Token não existe ou está expirado
  return null;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRATION_KEY);
  localStorage.removeItem("user");
};
