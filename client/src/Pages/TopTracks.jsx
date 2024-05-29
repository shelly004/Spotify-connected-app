import React, { useEffect, useState } from "react";
import { catchErrors } from "../utils";
import {
  SectionWrapper,
  TimeRangeButtons,
  TrackList,
  Loader,
} from "../components";
import { getTopTracks } from "../spotify";
function TopTracks() {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopTracks = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopTracks.data);
    };
    catchErrors(fetchData());
  }, [activeRange]);
  return (
    <>
      {topTracks ? (
        <main>
          <SectionWrapper title="Top Tracks" breadcrumb={true}>
            <TimeRangeButtons
              activeRange={activeRange}
              setActiveRange={setActiveRange}
            />
            {topTracks && topTracks.items && (
              <TrackList tracks={topTracks.items} />
            )}
          </SectionWrapper>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default TopTracks;
