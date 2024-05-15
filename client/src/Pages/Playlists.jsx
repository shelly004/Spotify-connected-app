import React, { useEffect, useState } from "react";
import { SectionWrapper, PlaylistsGrid } from "../components";
import { getCurrentUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";

function Playlists() {
  const [playlists, setPlaylists] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylistsData(userPlaylists.data);
    };
    catchErrors(fetchData());
  }, []);
  //console.log("Playlists Data", playlistsData);

  useEffect(() => {
    if (!playlistsData) {
      return;
    }
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    //update the state variable playlists with the playlistsData;
    setPlaylists((playlists) => (playlists || []).concat(playlistsData.items));

    catchErrors(fetchMoreData());
  }, [playlistsData]);
  //console.log("Playlists=>", playlists);

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {playlists && <PlaylistsGrid playlists={playlists} />}
      </SectionWrapper>
    </main>
  );
}

export default Playlists;
