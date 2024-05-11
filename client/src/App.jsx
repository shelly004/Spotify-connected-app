import { useEffect, useState } from "react";
import {
  Route,Routes,
  useLocation,
} from 'react-router-dom';
import { accessToken, getCurrentUserProfile, logout } from "./spotify";
import { GlobalStyle } from "./styles";
import styled from "styled-components";
import { Login, Profile } from './Pages';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  const [token, setToken] = useState();
  const [profile, setProfile] = useState();

  useEffect(() => {
    setToken(accessToken);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    
    <>
      <GlobalStyle/>
      {!token ? (
        <Login/>
      ) : (
         <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <Routes>
             <ScrollToTop />
            <Route path="/top-artists">
              <h1>Top Artists</h1>
            </Route>
            <Route path="/top-tracks">
              <h1>Top Tracks</h1>
            </Route>
            <Route path="/playlists/:id">
              <h1>Playlist</h1>
            </Route>
            <Route path="/playlists">
              <h1>Playlists</h1>
            </Route>
              <Route path="/">
                <Profile />
            </Route>
        </Routes>
          
         </>
        // <Routes>
        //      <ScrollToTop />
        //     <Route path="/top-artists">
        //       <h1>Top Artists</h1>
        //     </Route>
        //     <Route path="/top-tracks">
        //       <h1>Top Tracks</h1>
        //     </Route>
        //     <Route path="/playlists/:id">
        //       <h1>Playlist</h1>
        //     </Route>
        //     <Route path="/playlists">
        //       <h1>Playlists</h1>
        //     </Route>
        //     <Route path="/">
        //       <>
        //         <button onClick={logout}>Log Out</button>

        //         {profile && (
        //           <div>
        //             <h1>{profile.display_name}</h1>
        //             <p>{profile.followers.total} Followers</p>
        //             {profile.images.length && profile.images[0].url && (
        //               <img src={profile.images[0].url} alt="Avatar" />
        //             )}
        //           </div>
        //         )}
        //       </>
        //     </Route>
        // </Routes>
      )}
    </>
  );
}

export default App;

