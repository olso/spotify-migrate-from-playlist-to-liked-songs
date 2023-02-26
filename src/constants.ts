import * as dotenv from "dotenv";
import path from "node:path";

dotenv.config();

export const PLAYLIST_TRACKS_FILE_PATH = path.join(
  __dirname,
  "../data/playlistTracks.json"
);
export const SAVED_TRACKS_FILE_PATH = path.join(
  __dirname,
  "../data/savedTracks.json"
);

export const {
  FROM_PLAYLIST_ID = "",
  CLIENT_ID = "",
  CLIENT_SECRET = "",
  ACCESS_TOKEN = "",
  AUTHORIZATION_CODE = "",
  REDIRECT_URI = "",
} = process.env;

export const LIMIT = Number(process.env.LIMIT);
export const DELAY_MS = Number(process.env.DELAY_MS);

export const SCOPES = process.env.SCOPES?.split(",") ?? [];
