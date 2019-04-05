var year, month, day;
now = new Date();
year = now.getFullYear();
month = now.getMonth(); // 0-indexなので注意
day = now.getDate();


contructCalenderMold();
exeCalenderProcess();  // 初回起動


function exeCalenderProcess(){
    var calender = makeCalenderBaseData(year, month);
    showCalenderHeader();
    showCalender(calender);
    grantCalenderColor();
}


$('#next-btn').click(function(){ 
    addMonth();
    exeCalenderProcess();
});


$('#prev-btn').click(function(){ 
    subMonth();
    exeCalenderProcess();
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


// カレンダーに表示するデータを作ります
function makeCalenderBaseData(year, month){
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


// カレンダー上部の〇〇年××月を表示します
function showCalenderHeader(){
    $('#calender-header .text').text(`${year}年${month + 1}月`);
}


// カレンダーの型にデータを差し込みます
function showCalender(calender){
    for (let i = 0; i < calender.length; i++){
        for (let j = 0; j < calender.length; j++){
            if (i == 0) {
                $('.legend').eq(j).text(calender[i][j]);
            } else {
                //  曜日部があるので、日付け部は７番目から始まる(0-indexed)
                $('.day-number').eq(7 * i + j - 7).text(calender[i][j]);
            }
        }
    }
}


// カレンダーの土曜日・日曜日に対して各色に対応した属性を付与します
function grantCalenderColor(year, month){
    for (let i = 0; i < 42; i++){
        // 日曜日は0, 7, 14...番目、土曜日は6, 13, 20...番目 
        if (i % 7 == 0){
            $('.content-wrapper').eq(i).attr('data-type', 'sunday');
        }
        if (i % 7 == 6) {
            $('.content-wrapper').eq(i).attr('data-type', 'suturday');
        }
    }
}


// カレンダーが入る表のhtmlを構築します
function contructCalenderMold(){
    var rows = [];
    var table = document.createElement('table')
    var calenderRowNum = 7; // 曜日部分に１行
    var calenderColNum = 7;
    
    for(let i = 0; i < calenderRowNum; i++){
        rows.push(table.insertRow(-1));
        for(let j = 0; j < calenderColNum; j++){
            cell = rows[i].insertCell(-1);
            if (i == 0){
                cell.appendChild(moldCalenderLegend());
            } else {
                cell.appendChild(moldCalenderContent());
            }
        }
    }
    document.getElementById('calender').removeChild(document.getElementById('calender').childNodes[0]);
    document.getElementById('calender').appendChild(table);
}

// 曜日部分のelement tree
function moldCalenderLegend(){
    var divWrapper = document.createElement('div');
    var pLegend = document.createElement('p');
    divWrapper.className = 'legend-wrapper';
    pLegend.className = 'legend';
    divWrapper.appendChild(pLegend);
    return divWrapper
}

// 日付け部分のelement tree
function moldCalenderContent(){
    var divWrapper = document.createElement('div');
    var divUpper = document.createElement('div');
    var divLower = document.createElement('div')
    var pDayNumber = document.createElement('p');
    var pDayText = document.createElement('p');

    divWrapper.className = 'content-wrapper';
    divUpper.className = 'upper-part';
    divLower.className = 'loewr-part';
    pDayNumber.className = 'day-number';
    pDayText.className = 'day-text';

    divUpper.appendChild(pDayNumber);
    divUpper.appendChild(pDayText);
    divWrapper.appendChild(divUpper);
    divWrapper.appendChild(divLower);

    return divWrapper;
}
