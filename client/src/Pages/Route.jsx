import { createBrowserRouter } from "react-router-dom";
import { Profile, TopArtists, TopTracks } from "./index";

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
    element: <Profile />,
  },
  {
    path: "/playlists",
    element: <Profile />,
  },
]);

export default router;
