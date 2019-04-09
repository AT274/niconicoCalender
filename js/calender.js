import * as Holiday from './holiday.js';

// カレンダー上部の〇〇年××月を表示します
export function showCalenderHeader(year, month){
    $('#calender-header #text').text(`${year}年${month + 1}月`);
}


// カレンダー
export function showCalender(year, month){
    // 曜日と日付けを書き込む
    var calenderBaseData = makeCalenderBaseData(year, month);
    for (let i = 0; i < calenderBaseData.length; i++){
        for (let j = 0; j < calenderBaseData.length; j++){
            // 一行目は曜日部
            if (i == 0) {
                $('.legend').eq(j).text(calenderBaseData[i][j]);
            } else {
                //  曜日部があるので、日付け部は７番目から始まる(0-indexed)
                $('.day-number').eq(7 * i + j - 7).text(calenderBaseData[i][j]);
            }
        }
    }

    // 色づけをする
    grantCalenderColor(year, month);

    // 祝日を適用
    applyHoliday(year, month);
}


// カレンダーに表示するデータを作ります
export function makeCalenderBaseData(year, month){
    // year年month月は何日あるか
    var numOfDay = new Date(year, month + 1, 0).getDate();
    
    // year年month月は何曜日から始まるか
    var choicedYearMonth = new Date(year, month, 1, 9, 0);  // 9時間の時差を調整
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


// カレンダーの土曜日・日曜日に対して各色に対応したクラスを付与します
export function grantCalenderColor(year, month){
    for (let i = 0; i < 49; i++){
        // 日曜日は0, 7, 14...番目、土曜日は6, 13, 20...番目 
        if (i % 7 == 0){
            $('td').eq(i).addClass('sunday');
        } else if (i % 7 == 6) {
            $('td').eq(i).addClass('saturday');
        } else {
            $('td').eq(i).addClass('weekday');
        }
    }
}


// カレンダーに祝日を適用します
export function applyHoliday(year, month){
    var holidayData = Holiday.getHoliday(year);
    // year年month月は何曜日から始まるか
    var choicedYearMonth = new Date(year, month, 1, 9, 0);  // 9時間の時差を調整
    var startDayOfWeeK = choicedYearMonth.getDay();
    
    for (let holiday of holidayData){
        if (holiday['month'] - 1 == month){
            $('td').eq(parseInt(holiday['date']) + startDayOfWeeK  + 7 - 1).addClass('holiday');
            $('.day-text').eq(parseInt(holiday['date']) + startDayOfWeeK - 1).text(holiday['name']);
        }
    }
}
