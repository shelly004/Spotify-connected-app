import { createBrowserRouter } from "react-router-dom";
import { Playlists, Profile, TopArtists, TopTracks, Playlist } from "./index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  {
    path: "/top-artists",
    element: <TopArtists />,
  },
  {
    path: "/top-tracks",
    element: <TopTracks />,
  },
  {
    path: "/playlists/:id",
    element: <Playlist />,
  },
  {
    path: "/playlists",
    element: <Playlists />,
  },
]);

export default router;
