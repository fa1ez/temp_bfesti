// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";

import moment from "moment";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const storedToken1: any = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      );
      const storedToken2 = JSON.parse(storedToken1);
      const userDataCheck: any = window.localStorage.getItem("userData");
      console.log(userDataCheck);
      if (storedToken2) {
        setLoading(true);
        if (isLoggedIn()) {
          setUser(JSON.parse(userDataCheck));
        } else {
          console.log("Logout due to token expiry!");
          handleLogout();
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback: ErrCallbackType,
    setLoading?: any
  ) => {
    axios
      .post(authConfig.loginEndpoint, {
        email: params.email,
        password: params.password,
      })
      .then(async (response) => {
        if (response.data.responseCode != 200) {
          return errorCallback({});
        }
        const res = response.data.response;

        const userData: any = {
          userName: res.AdminName,
          name: res.AdminName,
          role: "admin",
        };

        const tokenData = {
          token: response.data.token,
          expiry: response.data.expiresAt,
        };
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          JSON.stringify(tokenData)
        );
        window.localStorage.setItem("userData", JSON.stringify(userData));
        const returnUrl = router.query.returnUrl;
        setUser(userData);
        setLoading();
        const redirectURL: any =
          returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL);
      })
      .catch((err) => {
        console.log(err);
        setLoading();
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  function isLoggedIn() {
    return moment().isBefore(getExpirationAccessToken());
  }
  function getExpirationAccessToken() {
    const expiration1: any = localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    const expiration = JSON.parse(expiration1);
    if (expiration1) {
      const expiresAt = expiration.expiry || "{}";

      return moment(expiresAt);
    } else {
      return null;
    }
  }
  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin(
            { email: params.email, password: params.password },
            errorCallback
              ? errorCallback
              : () => console.log("Invalid email or password")
          );
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
