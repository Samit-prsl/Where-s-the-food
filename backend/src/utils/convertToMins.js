 const getMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

 const getHours = (mins) => {
    return mins/60
}

module.exports = {getMinutes,getHours}