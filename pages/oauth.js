import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Cookie from "js-cookie";

// components
import Loading from "../components/Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

const Oauth = () => {
  const { data: session } = useSession();
  const { logout, router, user, setUser } = useContext(_appContext);
  const [processing, setProcessing] = useState(false);

  const login = async () => {
    const data = await service("oauth");
    const { user, token, success } = data;
    if (success) {
      Cookie.set("token", data.token, {
        expires: router.query.expires ? undefined : 3600,
      });
      setUser(user);
    } else {
      if (error) {
        alert(error);
      }
      logout();
    }
  };

  // if user_id exists or is updated, redirect to home
  useEffect(() => {
    if (user && router) {
      router.push(`/${router.query.redirect ? router.query.redirect : ""}`);
    }
  }, [user, router]);

  useEffect(() => {
    if (
      !processing &&
      typeof session !== "undefined" &&
      session !== null &&
      ["github", "google", "facebook", "apple"].includes(router.query.provider)
    ) {
      login();
    }
  }, [processing, setProcessing, session, router]);

  return <Loading />;
};

export default Oauth;
