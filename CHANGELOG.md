# Changelog

## 0.4.1

Encoding the sharing URL so it can be shared in social media and whatsapp, etc

## 0.4.0

New functionality to share workouts:

- Reading the params from the url and replacing the initial state if the workout param is present and different from the initial one
- Catching errors if the workout param is malformed (Still need to add validation per each individual timer)
- New actions/constants/reducers to support the Shareable workouts and the share modal window
- New query strings
- Minor fix: Setting the footer to stay always in the bottom

## 0.3.0

- Google analytics code Style improvements
- Mayor changes
  -- Moved the time management out of the timer.tsx to the app to improve the state operations
  -- Removed the amount of snapshots snaps throughout the actions. Now the app only keeps one in memory for resetting the times to their original state
  -- New audio cues as per user (my friends) feedback
- New constants for organising the code a bit better
- New scroll utilities

## 0.2.1

- Fixing a bug that was preventing empty titles which was causing an odd behaviour in the UX
- New style for the Rest interval stepper

## v0.2.0

- New feature to add Rest intervals between timers
- Style fixes

## v0.1.1

- Adding a button to close the modal windows for mobile to improve the UX
- Camelcasing the names of some css classes (Im planning to do the same for the rest of the app)
- Reducing the time increments to 10 instead 15 As suggested by Matja :)
- Removing the blur animations as they are too taxing performance wise
- Adding a few lines to the readme file for when the repo goes public
- Improving the UX for Mobile screens
