import { useContext } from "react";
import GoogleLogin from "react-google-login";
import GlobalStyle from "../GlobalStyle";
import { postData } from "./http-request";
import { BearerTokenContext } from "../App";
import axios from "axios";

const LoginButton = ({ loginHandler }) => {
  const { currentToken, setBearerToken } = useContext(BearerTokenContext);

  const getTokenIdByNetlifyKey =
    "oauth2_ss::https://gregarious-gumdrop-867b80.netlify.app::1::DEFAULT::_ss_";
  const clientId =
    "112172327061-95mqb878sgpt8t955rkkdug7mvgco8od.apps.googleusercontent.com";

  const onSuccess = async (res) => {
    loginHandler(true);

    const response = await postData("auth/google", {
      googleTokenId: res.tokenId,
    });

    console.log(response);

    // const loginSuccessToken = await response.data.token;
    // setBearerToken(loginSuccessToken);
    localStorage.removeItem(getTokenIdByNetlifyKey);
    const bearerToken = localStorage.getItem(getTokenIdByNetlifyKey);
    console.log(bearerToken);
    setBearerToken(bearerToken);
  };

  const onFailure = (res) => {
    console.log("로그인 실패 :/", res);
  };

  return (
    <>
      <GlobalStyle />
      <GoogleLogin
        clientId={clientId}
        buttonText={"로그인"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
};

export default LoginButton;
