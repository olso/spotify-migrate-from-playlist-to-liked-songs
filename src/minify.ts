import type { PlaylistTrack, SavedTrack, Track } from "./types";

export const minifyPlaylistTracks = (tracks: PlaylistTrack[]): Track[] =>
  tracks.reduce((result, { track, is_local, added_at }) => {
    if (is_local || !track) {
      return result;
    }

    return [
      ...result,
      {
        addedAt: added_at,
        id: track.id,
        href: track.href,
        uri: track.uri,
      },
    ];
  }, [] as Track[]);

export const minifySavedTracks = (tracks: SavedTrack[]): Track[] =>
  tracks.reduce((result, { track, added_at }) => {
    if (!track) {
      return result;
    }

    return [
      ...result,
      {
        addedAt: added_at,
        id: track.id,
        href: track.href,
        uri: track.uri,
      },
    ];
  }, [] as Track[]);
