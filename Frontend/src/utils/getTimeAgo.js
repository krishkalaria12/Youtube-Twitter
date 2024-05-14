function getTimeAgo(dateObject) {
    // Convert provided date object to a Date object
    const providedDate = new Date(dateObject.year, dateObject.month - 1, dateObject.day);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - providedDate;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    }

    // Convert seconds to minutes
    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }

    // Convert minutes to hours
    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hours ago`;
    }

    // Convert hours to days
    const days = Math.floor(hours / 24);

    if (days < 30) {
        return `${days} days ago`;
    }

    // Convert days to months (assuming 30 days in a month)
    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months} months ago`;
    }

    // Convert months to years
    const years = Math.floor(months / 12);

    return `${years} years ago`;
}

export default getTimeAgo