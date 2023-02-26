import { differenceBy, sortBy } from "lodash";

import type { Track } from "./types";

export type ReconstructProps = {
  playlistTracks: Track[];
  savedTracks: Track[];
};

export const reconstruct = ({
  playlistTracks,
  savedTracks,
}: ReconstructProps): Track[] => {
  if (!playlistTracks.length || !savedTracks.length) {
    throw new Error("Something went wrong");
  }

  console.log("playlistTracks:", playlistTracks.length);

  if (new Set(playlistTracks).size !== playlistTracks.length) {
    throw new Error("Something went wrong");
  }

  console.log("savedTracks:", savedTracks.length);

  if (new Set(savedTracks).size !== savedTracks.length) {
    throw new Error("Something went wrong");
  }

  const missing = differenceBy(playlistTracks, savedTracks, "id");
  const check = savedTracks.find((value) => value.id === missing[0].id);

  if (check) {
    throw new Error("Something went wrong");
  }

  console.log("playlist tracks missing in saved tracks:", missing.length);

  const reconstructed = [...savedTracks];
  reconstructed.push(...missing);
  
  const reconstructedSorted = sortBy(reconstructed, 'addedAt');

  console.log("new saved songs", reconstructedSorted.length);

  return reconstructedSorted;
};
