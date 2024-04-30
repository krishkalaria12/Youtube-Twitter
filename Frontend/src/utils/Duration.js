function secondsToMinutesSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = parseInt(seconds % 60);
    return minutes + ":" + remainingSeconds;
}

export default secondsToMinutesSeconds