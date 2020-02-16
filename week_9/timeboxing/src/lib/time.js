function getMinutesAndSecondsFromDuractionInSeconds(hoursLeft, timeLeftInSeconds) {
     const minutesLeft = hoursLeft === 0 ? Math.floor(timeLeftInSeconds / 60) : Math.floor(((timeLeftInSeconds - hoursLeft * 3600) / 60));
     const secondsLeft = Math.floor(timeLeftInSeconds % 60);
     return [minutesLeft, secondsLeft];
}
export {
     getMinutesAndSecondsFromDuractionInSeconds
}