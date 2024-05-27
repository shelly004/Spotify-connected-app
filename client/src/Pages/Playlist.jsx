import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import { getPlaylistById } from "../spotify";
import { StyledHeader } from "../styles/index";
import { SectionWrapper, TrackList } from "../components";

function Playlist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState();
  const [tracksData, setTracksData] = useState();
  const [tracks, setTracks] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setPlaylist(data);
      setTracksData(data.tracks);
    };

    catchErrors(fetchData());
  }, []);

  console.log(playlist); //this playlist obj will return the track data i.e the url to get all the tracks and the items array containing all the tracks
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
      const ids = tracksData.itmes.map(({ track }) => track.id).join(",");
      console.log("Value of ids", ids);
    };

    catchErrors(fetchAudioFeatures);
  }, [tracksData]);
  console.log("Tracks", tracksData);
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
              {tracks && <TrackList tracks={tracks} flag={true} />}
            </SectionWrapper>
          </main>
        </>
      )}
    </>
  );
}

export default Playlist;
