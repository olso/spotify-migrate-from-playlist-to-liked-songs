import { writeJSON, exists, readJSON } from "fs-extra";

import { getApi } from "./getApi";
import { getAllPlaylistTracks } from "./getAllPlaylistTracks";
import { getAllSavedTracks } from "./getAllSavedTracks";
import { reconstruct } from "./reconstruct";
import { push } from "./push";
import { minifyPlaylistTracks, minifySavedTracks } from "./minify";
import {
  DELAY_MS,
  FROM_PLAYLIST_ID,
  LIMIT,
  PLAYLIST_TRACKS_FILE_PATH,
  SAVED_TRACKS_FILE_PATH,
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  AUTHORIZATION_CODE,
  SCOPES,
  REDIRECT_URI,
  RECONSTRUCTED_TRACKS_FILE_PATH,
} from "./constants";

const main = async () => {
  const api = await getApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scopes: SCOPES,
    accessToken: ACCESS_TOKEN,
    authorizationCode: AUTHORIZATION_CODE,
  });

  if (!(await exists(PLAYLIST_TRACKS_FILE_PATH))) {
    const allPlaylistTracks = await getAllPlaylistTracks({
      api,
      playlistId: FROM_PLAYLIST_ID,
      delayMs: DELAY_MS,
      limit: LIMIT,
    });

    await writeJSON(
      PLAYLIST_TRACKS_FILE_PATH,
      minifyPlaylistTracks(allPlaylistTracks),
      {
        spaces: 2,
      }
    );
  }

  if (!(await exists(SAVED_TRACKS_FILE_PATH))) {
    const allSavedTracks = await getAllSavedTracks({
      api,
      delayMs: DELAY_MS,
      limit: LIMIT,
    });

    await writeJSON(SAVED_TRACKS_FILE_PATH, minifySavedTracks(allSavedTracks), {
      spaces: 2,
    });
  }

  if (!(await exists(RECONSTRUCTED_TRACKS_FILE_PATH))) {
    const reconstructed = await reconstruct({
      playlistTracks: await readJSON(PLAYLIST_TRACKS_FILE_PATH),
      savedTracks: await readJSON(SAVED_TRACKS_FILE_PATH),
    });

    await writeJSON(RECONSTRUCTED_TRACKS_FILE_PATH, reconstructed, {
      spaces: 2,
    });
  }

  await push({
    api,
    tracks: await readJSON(RECONSTRUCTED_TRACKS_FILE_PATH),
  });
};

main();
