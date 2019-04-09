import * as CalenderMold from './calender_mold.js';
import * as Calender from './calender.js'

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth(); // 0-indexなので注意

exeCalenderProcess();  // 初回起動


function exeCalenderProcess(){
    CalenderMold.contructCalenderMold();
    Calender.showCalenderHeader(year, month)
    Calender.showCalender(year, month);
}


$('#next-btn').click(function(){ 
    addMonth();
    exeCalenderProcess();
    $('#modal').hide();
});


$('#prev-btn').click(function(){ 
    subMonth();
    exeCalenderProcess();
    $('#modal').hide();
});


function addMonth(){
    month += 1;
    if (month == 12){
        month = 0;
        year += 1
    }
}


function subMonth(){
    month -= 1;
    if (month == -1){
        month = 11;
        year -= 1
    }
}
