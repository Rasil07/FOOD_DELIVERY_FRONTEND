export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  if (token) {
    return token;
  }
  return null;
};
