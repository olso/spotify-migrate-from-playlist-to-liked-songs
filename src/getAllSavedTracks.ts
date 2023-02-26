import type SpotifyWebApi from "spotify-web-api-node";
import delay from "delay";

import type { SavedTrack } from "./types";

export type GetAllSavedTracksParams = {
  api: SpotifyWebApi;
  offset?: number;
  tracks?: SavedTrack[];
  limit: number;
  delayMs: number;
};

export const getAllSavedTracks = async ({
  tracks = [],
  api,
  limit,
  offset = 0,
  delayMs,
}: GetAllSavedTracksParams): Promise<SavedTrack[]> => {
  const {
    body: { items, total },
  } = await api.getMySavedTracks({
    limit,
    offset,
  });

  console.log("getAllSavedTracks", {
    offset,
    total,
  });

  const newTracks = [...tracks, ...items];

  if (items.length) {
    await delay(delayMs);

    return getAllSavedTracks({
      limit,
      delayMs,
      tracks: newTracks,
      offset: offset + limit,
      api,
    });
  }

  return newTracks;
};
