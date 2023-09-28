exports.getDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toString();
    return formattedDate;
}