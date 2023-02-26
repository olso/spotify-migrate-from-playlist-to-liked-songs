import SpotifyWebApi from "spotify-web-api-node";

export type GetApiParams = {
  redirectUri: string;
  clientId: string;
  clientSecret: string;
  accessToken: string;
  authorizationCode: string;
  scopes: string[];
};

export const getApi = async ({
  redirectUri,
  clientId,
  clientSecret,
  accessToken,
  authorizationCode,
  scopes,
}: GetApiParams): Promise<SpotifyWebApi> => {
  const api = new SpotifyWebApi({
    redirectUri,
    clientId,
    clientSecret,
  });

  if (accessToken.length) {
    api.setAccessToken(accessToken);

    return api;
  }

  if (authorizationCode) {
    const {
      body: { access_token },
    } = await api.authorizationCodeGrant(authorizationCode);

    console.log("Add access token to .env if needed", access_token);

    api.setAccessToken(access_token);

    return api;
  }

  const authorizeURL = api.createAuthorizeURL(scopes, `${Date.now()}`, true);

  console.log("Visit", authorizeURL);
  console.log("\n");
  console.log("Add authorization code to .env and start again");
  process.exit(0);
};
