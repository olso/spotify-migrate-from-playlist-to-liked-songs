import type SpotifyWebApi from "spotify-web-api-node";
import delay from "delay";

import type { PlaylistTrack } from "./types";

export type GetAllPlaylistTracksParams = {
  playlistId: string;
  api: SpotifyWebApi;
  offset?: number;
  tracks?: PlaylistTrack[];
  limit: number;
  delayMs: number;
};

export const getAllPlaylistTracks = async ({
  playlistId,
  tracks = [],
  offset = 0,
  limit,
  delayMs,
  api,
}: GetAllPlaylistTracksParams): Promise<PlaylistTrack[]> => {
  const {
    body: { items, total },
  } = await api.getPlaylistTracks(playlistId, {
    offset,
    limit,
  });

  console.log("getAllPlaylistTracks", {
    offset,
    total,
  });

  const newTracks = [...tracks, ...items];

  if (items.length) {
    await delay(delayMs);

    return getAllPlaylistTracks({
      playlistId,
      limit,
      delayMs,
      tracks: newTracks,
      offset: offset + limit,
      api,
    });
  }

  return newTracks;
};
