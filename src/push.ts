import type SpotifyWebApi from "spotify-web-api-node";
import delay from "delay";

import type { Track } from "./types";

export type PushProps = {
  tracks: Track[];
  api: SpotifyWebApi;
};

// want specific order and time delay so it can be sorted correctly by time
export const push = async ({ tracks, api }: PushProps): Promise<void> => {
  if (!tracks.length) {
    throw new Error("Something went wrong");
  }

  for (let idx = 0; idx < tracks.length; idx++) {
    await delay(1000);
    console.log("adding", tracks[idx], { idx, total: tracks.length });
    await api.addToMySavedTracks([tracks[idx].id]);
  }
};
