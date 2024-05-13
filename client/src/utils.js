// DRY: creating a higher order function
// a function which takes another function as an argument or returns a function

export const catchErrors = fn =>                 //not understood 
  function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };

// the duration of song returned is in milliseconds so formatDuration function is converting milliseconds into `minutes:seconds` format
export const formatDuration = ms => {
    const minutes = Math.floor(ms / 60000);                             // understood
    const seconds = Math.floor(((ms % 60000) / 1000));                  // partially understood 
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}