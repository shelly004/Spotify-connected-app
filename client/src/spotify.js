import axios from "axios";

//localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
}

// retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

//checking the token is expired or not
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

  if (!accessToken || !timestamp) {
    return false;
  }
  
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return (millisecondsElapsed / 1000) > Number(expireTime); //check if current time is greater than expired time
};



const refreshToken = async () => {
  try {
    //logout if no refresh token
    if (!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
    ) {
      console.error('No refresh token available');
      logout();
    }

    //  `/refresh_token` endpoint
    const { data } = await axios.get(`http://localhost:8888/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

    // Update localStorage values
    console.log("Access token Data=>",data);
    localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    
    localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload the page for localStorage updates to be reflected
    //alert('something is going on inside refresh token');
    window.location.reload();
    console.log("after reload");

  } catch (e) {
    console.error(e);
  }
};

const getAccessToken = () => {
 
  const queryString = window.location.search;        //query string from url 

  const urlParams = new URLSearchParams(queryString);  //helps to work with queryString 
  
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  };
  
  const hasError = urlParams.get('error');

  //if error or token is expired then refresh the token
  if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    console.log("Token expired")
    refreshToken();
  }
  
  
  //if valid token is present  
  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    
    for (const property in queryParams) {
      
      localStorage.setItem(property, queryParams[property]);   //Store the query params in localStorage
    }
    //set timestamp
    localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    
    return queryParams[LOCALSTORAGE_KEYS.accessToken];  //return token
  }
  

  return false;
};


export const accessToken = getAccessToken();

//global-axios-defaults
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';


//current User's Profile
export const getCurrentUserProfile = () => axios.get('/me');


//list of user's playlist
export const getCurrentUserPlaylists = (limit = 20) => {
  return axios.get(`/me/playlists?limit=${limit}`);
};


//User's Top Artist which takes time_range in the parameter
export const getTopArtists = (time_range = 'short_term') => {
  return axios.get(`/me/top/artists?time_range=${time_range}`);
};


//User's Top Tracks which takes time_range as parameter
 export const getTopTracks = (time_range = 'short_term') => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`);
};

//get playlist by Id
export const getPlaylistById = playlist_id => {
  return axios.get(`/playlists/${playlist_id}`);
}

//sort tracks based on audio features like danceability, energy, tempo it accepts A comma-separated list of the Spotify IDs for the tracks.
export const getAudioFeaturesForTracks = ids => {
  return axios.get(`/audio-features?ids=${ids}`);
};