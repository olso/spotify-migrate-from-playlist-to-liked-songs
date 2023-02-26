import type SpotifyWebApi from "spotify-web-api-node";

export type PlaylistTrack = Awaited<
  ReturnType<SpotifyWebApi["getPlaylistTracks"]>
>["body"]["items"][0];


export type SavedTrack = Awaited<
  ReturnType<SpotifyWebApi["getMySavedTracks"]>
>["body"]["items"][0];

export type Track = {
  addedAt: string;
  id: string;
  href: string;
  uri: string;
}
