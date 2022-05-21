import { GoogleLogout } from "react-google-login";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const clientId =
  "112172327061-95mqb878sgpt8t955rkkdug7mvgco8od.apps.googleusercontent.com";

const LogoutButton = ({ logoutHandler }) => {
  const onSuccess = () => {
    logoutHandler(false);
    localStorage.removeItem("bearerToken"); 
  };

  useEffect(() => {
    return () => logoutHandler(false);
  }, []);

  return (
    <>
      <Link to="/">
        <GoogleLogout
          clientId={clientId}
          buttonText={"로그아웃"}
          onLogoutSuccess={onSuccess}
        />
      </Link>
    </>
  );
};

export default LogoutButton;
