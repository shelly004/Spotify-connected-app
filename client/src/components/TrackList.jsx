import { formatDuration } from "../utils";
import { StyledTrackList } from "../styles";

const TrackList = ({ tracks, flag }) => (
  <>
    {tracks && tracks.length ? (
      <StyledTrackList>
        {tracks.map((track, i) => {
          const currentTrack = flag ? track.track : track;
          return (
            <li className="track__item" key={i}>
              <div className="track__item__num">{i + 1}</div>
              <div className="track__item__title-group">
                {currentTrack.album.images.length &&
                  currentTrack.album.images[2] && (
                    <div className="track__item__img">
                      <img
                        src={currentTrack.album.images[2].url}
                        alt={currentTrack.name}
                      />
                    </div>
                  )}
                <div className="track__item__name-artist">
                  <div className="track__item__name">{currentTrack.name}</div>
                  <div className="track__item__artist">
                    {currentTrack.artists.map((artist, i) => (
                      <span key={i}>
                        {artist.name}
                        {i !== currentTrack.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="track__item__album ">
                {currentTrack.album.name}
              </div>
              <div className="track__item__duration">
                {formatDuration(currentTrack.duration_ms)}
              </div>
            </li>
          );
        })}
      </StyledTrackList>
    ) : (
      <p className="empty-notice">No tracks available</p>
    )}
  </>
);

export default TrackList;
