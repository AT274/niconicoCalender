var year, month, day;
now = new Date();
year = now.getFullYear();
month = now.getMonth(); // 0-indexなので注意
day = now.getDate();

var calender = makeCalender(year, month);
console.log(calender);