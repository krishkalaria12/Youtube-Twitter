
function formatDateTime(dateString) {
    var date = new Date(dateString);
    var currentDate = new Date();
    var timeDiff = currentDate - date;
    var secondsDiff = Math.floor(timeDiff / 1000);
    var minutesDiff = Math.floor(secondsDiff / 60);
    var hoursDiff = Math.floor(minutesDiff / 60);
    var daysDiff = Math.floor(hoursDiff / 24);
    var monthsDiff = Math.floor(daysDiff / 30);
    var yearsDiff = Math.floor(monthsDiff / 12);
    
    if (yearsDiff >= 1) {
        return yearsDiff + " year" + (yearsDiff > 1 ? "s" : "");
    } else if (monthsDiff >= 1) {
        return monthsDiff + " month" + (monthsDiff > 1 ? "s" : "");
    } else if (daysDiff >= 1) {
        return daysDiff + " day" + (daysDiff > 1 ? "s" : "");
    } else if (hoursDiff >= 1) {
        return hoursDiff + " hour" + (hoursDiff > 1 ? "s" : "");
    } else if (minutesDiff >= 1) {
        return minutesDiff + " minute" + (minutesDiff > 1 ? "s" : "");
    } else {
        return secondsDiff + " second" + (secondsDiff > 1 ? "s" : "");
    }
}

export default formatDateTime