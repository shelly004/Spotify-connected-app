import React, { useEffect, useState } from "react";
import { catchErrors } from "../utils";
import { SectionWrapper, ArtistsGrid, TimeRangeButtons } from "../components";
import { getTopArtists } from "../spotify";

function TopArtists() {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtist = await getTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtist.data);
    };
    catchErrors(fetchData());
  }, [activeRange]);
  console.log(topArtists);
  return (
    <>
      {topArtists && (
        <main>
          <SectionWrapper title="Top Artists" breadcrumb={true}>
            <TimeRangeButtons
              activeRange={activeRange}
              setActiveRange={setActiveRange}
            />
            <ArtistsGrid artists={topArtists.items} />
          </SectionWrapper>
        </main>
      )}
    </>
  );
}

export default TopArtists;
