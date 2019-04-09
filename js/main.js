import * as CalenderMold from './calender_mold.js';
import * as Calender from './calender.js'

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth(); // 0-indexなので注意

exeCalenderProcess();  // 初回起動


// カレンダーを再構築します
function exeCalenderProcess(){
    CalenderMold.contructCalenderMold();
    Calender.showCalenderHeader(year, month)
    Calender.showCalender(year, month);
}


// 翌月のカレンダーに進むボタン
$('#next-btn').click(function(){ 
    addMonth();
    exeCalenderProcess();
    $('#modal').hide();
});


// 前月のカレンダーに戻るボタン
$('#prev-btn').click(function(){ 
    subMonth();
    exeCalenderProcess();
    $('#modal').hide();
});


// 翌月に進む
function addMonth(){
    month += 1;
    if (month == 12){
        month = 0;
        year += 1
    }
}


// 前月に戻る
function subMonth(){
    month -= 1;
    if (month == -1){
        month = 11;
        year -= 1
    }
}
