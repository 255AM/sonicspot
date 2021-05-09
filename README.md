

Sonicspot- A name that tune style game using react hooks and spotify api

try it out: https://sonicspot.herokuapp.com/
A premium spotify account is required to play.
Occassionaly Heroku returns an H12 error, usually on first load of a device. Allow load to throw error, click link again and app usually loads. May need to repeat.
The app was created for desktop with some changes afterwards to give at least the capablility of mobile play

Years ago, friends and I would listen to the radio and compete to see who could name the artist and title of the song that played to show off our music knowledge. This was the motivation for this app. Music and music info has always been a big relationshio builder for me. 

I created this app as a front end capstone project for NewForce in a 2 week sprint. 

The design and layout of the app can still be greatly improved. If I had more time to create it, I would have started with a mobile first layout, but, this was my first attempt using a framework (semantic) with React and given the time constraints, design wasnt my priority. 

The app uses multiple fetch calls for CRUD operations to both spotify and a json server. THe app pulls data, and controls player playback through the spotify API. The Spotify SDK is used for playback. I utilized the react-spotify-web-player library created by Gil Barbara. It can be found at https://github.com/gilbarbara/react-spotify-web-playback.

I used a library called Fuse.js found at https://fusejs.io/ for fuzzy search capabilities. I use the library to allow the app to recognize when a user enters a string close to the correct answer and give points accordingly. The acceptable difference from the correct answer can be easily adjusted. 

GameFlow
- The app asks the user to login on start. If the user email exists login is successful, if not you are given the option of creating a new account or playing as a guest.
- After user is logged into the app, they are then prompted to log in to a spotify premium account (required for gameplay). 
- After both accounts are logged in, the user is taken to a selection screen where the user can choose which type of music they would like to play.
  on selection, the user is presented with a short writeup on the type of music selected and given the choice to proceed or return to menu.
- Moving forward, the user is taken to the game screen
- The shuffled playlist begins to play. 
- The user is given a set amount of time to enter artist names and song titles of as many songs as possible before the timer runs out. 
- Each correct guess (artist or song) is 1 point. 
- Whne the user enteres the guess for each song, the user is presented feedback on whether the guess was correct or not. If not, the user is displayed the correct answer.
- At timer expiration, the total points scores is calculated and the displayed on the leaderboard if applicable.
- The user can select the username on the menu to view a set of stats including guess percentages and most played type of music.



Please contact me with any suggestions, bugs or job offers ;)




![sonic](https://user-images.githubusercontent.com/12179247/117581502-14475180-b0cb-11eb-9cfe-afb5e9b632d4.JPG)






