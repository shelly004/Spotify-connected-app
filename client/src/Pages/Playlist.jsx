import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import { getAudioFeaturesForTracks, getPlaylistById } from "../spotify";
import { StyledHeader, StyledDropdown } from "../styles/index";
import { SectionWrapper, TrackList } from "../components";

function Playlist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState();
  const [tracksData, setTracksData] = useState();
  const [tracks, setTracks] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState();
  const sortOptions = ["danceability", "tempo", "energy"];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setPlaylist(data);
      setTracksData(data.tracks);
    };

    catchErrors(fetchData());
  }, []);

  // console.log(playlist); //this playlist obj will return the track data i.e the url to get all the tracks and the items array containing all the tracks
  useEffect(() => {
    if (!tracksData) {
      return;
    }
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };
    setTracks((prevtracks) => (prevtracks || []).concat(tracksData.items));
    catchErrors(fetchMoreData());

    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map((item) => item.track.id);
      const { data } = await getAudioFeaturesForTracks(ids);
      console.log("data ", data);
      setAudioFeatures((audioFeatures) => [
        ...(audioFeatures ? audioFeatures : []),
        ...data["audio_features"],
      ]);
    };

    catchErrors(fetchAudioFeatures());
  }, [tracksData]);

  const handleAudioFeature = useCallback(
    (selectedOption) => {
      tracks.forEach((element, index) => {
        element["audio_feature"] = audioFeatures[index];
      });
      //console.log("Modified tracks", tracks);
      const sortedTracks = tracks.toSorted((a, b) => {
        return (
          b.audio_feature[selectedOption] - a.audio_feature[selectedOption]
        );
      });
      setTracks(sortedTracks);
      // console.log("Modified tracks", sortedTracks);
    },
    [audioFeatures]
  );
  console.log("Audio features", audioFeatures);
  console.log("Tracks", tracks);
  return (
    <>
      {playlist && (
        <>
          <StyledHeader>
            <div className="header__inner">
              {playlist.images.length && playlist.images[0].url && (
                <img
                  className="header__img"
                  src={playlist.images[0].url}
                  alt="Playlist Artwork"
                />
              )}
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlist.name}</h1>
                <p className="header__meta">
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total}{" "}
                      {`follower${playlist.followers.total !== 1 ? "s" : ""}`}
                    </span>
                  ) : null}
                  <span>
                    {playlist.tracks.total}{" "}
                    {`song${playlist.tracks.total !== 1 ? "s" : ""}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
          <main>
            <SectionWrapper title="Playlist" breadcrumb={true}>
              <StyledDropdown>
                <label className="sr-only" htmlFor="order-select">
                  Sort Tracks
                </label>
                <select
                  name="track-order"
                  id="order-select"
                  onChange={(e) => {
                    const selectedOption = e.target.value;
                    if (selectedOption) {
                      handleAudioFeature(selectedOption);
                    }
                  }}
                >
                  <option value="">Sort tracks</option>
                  {sortOptions.map((option, i) => (
                    <option value={option} key={i}>
                      {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                    </option>
                  ))}
                </select>
              </StyledDropdown>
              {tracks && <TrackList tracks={tracks} flag={true} />}
            </SectionWrapper>
          </main>
        </>
      )}
    </>
  );
}

export default Playlist;
