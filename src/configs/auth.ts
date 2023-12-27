export const API_URL =
  "http://Bfesti-prod-env.eba-ienpryu3.us-east-1.elasticbeanstalk.com";

export default {
  loginEndpoint: API_URL + "/admin/login",
  meEndpoint: "/auth/me",
  registerEndpoint: "/jwt/register",
  storageTokenKeyName: "accessToken",
  onTokenExpiration: "logout", // logout | refreshToken
};
