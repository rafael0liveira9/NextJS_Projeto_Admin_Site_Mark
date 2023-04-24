import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import authConfig from "src/configs/auth";
import nookies from "nookies";

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children, cookies }) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = cookies[authConfig.storageTokenKeyName];
      if (storedToken) {
        setLoading(true);
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}user`, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then(async (response) => {
            setLoading(false);

            setUser({ ...response.data });
          })
          .catch(() => {
            nookies.destroy(null, "userData");
            nookies.destroy(null, "refreshToken");
            nookies.destroy(null, "accessToken");
            setUser(null);
            setLoading(false);
            if (
              authConfig.onTokenExpiration === "logout" &&
              !router.pathname.includes("login")
            ) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params, errorCallback) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}signin`, {
        email: params.email,
        password: params.password,
      })
      .then(async (response) => {
        params.rememberMe
          ? nookies.set(
              null,
              authConfig.storageTokenKeyName,
              response.data.token,
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            )
          : null;
        const returnUrl = router.query.returnUrl;
        setUser({ ...response.data });
        params.rememberMe
          ? nookies.set(null, "userData", JSON.stringify(response.data), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            })
          : null;
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL);
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    nookies.destroy(null, "userData");
    nookies.destroy(null, "authConfig.storageTokenKeyName");
    router.push("/login");
  };

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err) => (errorCallback ? errorCallback(err) : null));
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
