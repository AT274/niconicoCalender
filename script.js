var year, month, day;
now = new Date();
year = now.getFullYear();
month = now.getMonth(); // 0-indexなので注意
day = now.getDate();

var calender = makeCalender(year, month);
console.log(calender)
showCalenderHeader();
showCalender(calender);

$('.btn').click(function(){ 
    if ($(this).attr('data-command') == 'next'){
        addMonth();
    }
    if ($(this).attr('data-command') == 'prev'){
        subMonth();
    }
    console.log(year, month);
    var calender = makeCalender(year, month);
    showCalenderHeader();
    showCalender(calender);
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


function makeCalender(year, month){
    const DAY_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"];

    // year年month月は何日あるか
    numOfDay = new Date(year, month + 1, 0).getDate();
    
    // year年month月は何曜日から始まるか
    choicedYearMonth = new Date(year, month, 1, 9, 0);  // 9時間の時差を調整
    var startDayOfWeeK = choicedYearMonth.getDay();

    // カレンダーを一次元配列で表現
    var oneDimensionalCalender = Array(42);
    oneDimensionalCalender.fill('');
    var day = 1
    for (let i = startDayOfWeeK; i < startDayOfWeeK + numOfDay; i++){
        oneDimensionalCalender[i] = day;
        day++;
    }

    // 6行7列の二次元配列としてカレンダーを表現
    var calender = [];
    for(var i = 0; i < 42; i += 7){
        calender.push(oneDimensionalCalender.slice(i, i + 7));
    }


    // 先頭行に曜日を追加
    calender.unshift(['日', '月', '火', '水', '木', '金', '土'])
    return calender;
}


function showCalenderHeader(){
    $('#calender-header .text').text(`${year}年${month + 1}月`);
}


function showCalender(calender){
    var rows = [];
    var table = document.createElement('table');


    console.log(divUpper);
    // 表示用カレンダーを構築
    for(i = 0; i < calender.length; i++){
        rows.push(table.insertRow(-1));
        
        for(j = 0; j < calender[0].length; j++){
            var divUpper = document.createElement('div');
            var divLower = document.createElement('div')
            var pDayNumber = document.createElement('p');
            var pDayText = document.createElement('p');
            
            divUpper.className = 'upper-part';
            divLower.className = 'loewr-part';
            pDayNumber.className = 'day-number';
            pDayText.className = 'day-text';
            cell = rows[i].insertCell(-1);
            cell.appendChild(divUpper);
            cell.appendChild(divLower);
            cell.appendChild(document.createTextNode(calender[i][j]));
        }
    }
　   
    document.getElementById('calender').removeChild(document.getElementById('calender').childNodes[0]);
    document.getElementById('calender').appendChild(table);
}
