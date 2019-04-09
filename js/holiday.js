// http://cly7796.net/wp/javascript/to-get-the-public-holiday-in-javascript/ をベースにしています
export function getHoliday(year) {
    // 祝日の定義
    var holidayList = [
        {
            'name': '元日',
            'date': '1/1',
            'startY': 1949,
        },
        {
            'name': '成人の日',
            'date': '1/15',
            'startY': 1949,
            'endY': 1999
        },
        {
            'name': '成人の日',
            'date': '1/' + happyMonday(year, 1, 2), // 1月の第2月曜日
            'startY': 2000,
            'endY': 9999
        },
        {
            'name': '建国記念の日',
            'date': '2/11',
            'startY': 1967,
            'endY': 9999
        },
        {
            'name': '天皇誕生日',
            'date': '2/23',
            'startY': 2020,
            'endY': 9999
        },
        {
            'name': '春分の日',
            'date': '3/' + shunbun(year),
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': '天皇誕生日',
            'date': '4/29',
            'startY': 1949,
            'endY': 1988
        },
        {
            'name': 'みどりの日',
            'date': '4/29',
            'startY': 1989,
            'endY': 2006
        },
        {
            'name': '昭和の日',
            'date': '4/29',
            'startY': 2007,
            'endY': 9999
        },
        {
            'name': '即位の日',
            'date': '5/1',
            'startY': 2019,
            'endY': 2019
        },
        {
            'name': '憲法記念日',
            'date': '5/3',
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': 'みどりの日',
            'date': '5/4',
            'startY': 2007,
            'endY': 9999
        },
        {
            'name': 'こどもの日',
            'date': '5/5',
            'startY': 1949,
            'endY': 9999
        },
        {
            'name': '海の日',
            'date': '7/20',
            'startY': 1996,
            'endY': 2002
        },
        {
            'name': '海の日',
            'date': '7/' + happyMonday(year, 7, 3), // 7月の第3月曜日
            'startY': 2003,
            'endY': 9999
        },
        {
            'name': '山の日',
            'date': '8/11',
            'startY': 2016,
            'endY': 9999
        },
        {
            'name': '敬老の日',
            'date': '9/15',
            'startY': 1966,
            'endY': 2002
        },
        {
            'name': '敬老の日',
            'date': '9/' + happyMonday(year, 9, 3), // 9月の第3月曜日
            'startY': 2003,
            'endY': 9999
        },
        {
            'name': '秋分の日',
            'date': '9/' + shubun(year),
            'startY': 1948,
            'endY': 9999
        },
        {
            'name': '体育の日',
            'date': '10/10',
            'startY': 1966,
            'endY': 1999
        },
        {
            'name': '体育の日',
            'date': '10/' + happyMonday(year, 10, 2), // 10月の第2月曜日
            'startY': 2000,
            'endY': 2019
        },
        {
            'name': 'スポーツの日',
            'date': '10/' + happyMonday(year, 10, 2), // 10月の第2月曜日
            'startY': 2020,
            'endY': 9999
        },
        {
            'name': '即位礼正殿の儀',
            'date': '10/22',
            'startY': 2019,
            'endY': 2019,
        },
        {
            'name': '文化の日',
            'date': '11/3',
            'startY': 1948,
            'endY': 9999
        },
        {
            'name': '勤労感謝の日',
            'date': '11/23',
            'startY': 1948,
            'endY': 9999
        },
        {
            'name': '天皇誕生日',
            'date': '12/23',
            'startY': 1989,
            'endY': 2018
        }
    ];
 
    var thisYearHolidayList = []; // 取得した祝日の一覧を格納する辞書
    for (var holiday of holidayList){
        // 指定した年にその祝日があるかどうか
        if(year >= holiday['startY'] && year <= holiday['endY']) {
        
            // 2020年用祝日移動処理
            if (year == 2020){
                if (holiday['name'] == '海の日'){
                    holiday['date'] = '7/23';
                }
                if (holiday['name'] == 'スポーツの日'){
                    holiday['date'] = '7/24';
                }
                if (holiday['name'] == '山の日'){
                    holiday['date'] = '8/10';
                }

            }
            // 祝日の追加
            var [holidayMonth, holidayDate] = holiday['date'].split('/');
            thisYearHolidayList.push({
                'name': holiday['name'],
                'month': holidayMonth,
                'date': holidayDate,
            });
 
            // 祝日が日曜日の場合は振替休日を追加する
            var substitute = substituteDay(year, parseFloat(holidayMonth), holidayDate, holidayList)
            if(substitute) {
                var [substituteMonth, substituteDate] = substitute.split('/');
                thisYearHolidayList.push({
                    'name': '振替休日',
                    'month': substituteMonth,
                    'date': substituteDate
                });
            }
 
            // 翌々日が祝日の場合は国民の休日を追加する
            var national = nationalHoliday(year, parseFloat(holidayMonth), parseFloat(holidayDate), holidayList);
            if(national) {
                var [nationalMonth, nationalDate] = national.split('/');
                thisYearHolidayList.push({
                    'name': '国民の休日',
                    'month': nationalMonth,
                    'date': nationalDate
                });
            }
        }
    }
    return thisYearHolidayList;
}
 
// 指定した年の春分の日を取得
export function shunbun(year) {
    if(year < 1900 || year > 2099) return;
    switch(year % 4) {
        case 0:
            if(year <= 1956) return 21;
            if(year <= 2088) return 20;
            return 19;
        case 1:
            if(year <= 1989) return 21;
            return 20;
        case 2:
            if(year <= 2022) return 21;
            return 20;
        case 3:
            if(year <= 1923) return 22;
            if(year <= 2055) return 21;
            return 20;
    }
}
 
// 指定した年の秋分の日を取得
export function shubun(year) {
    if(year < 1900 || year > 2099) return;
    switch(year % 4) {
        case 0:
            if(year <= 2008) return 23;
            return 22;
        case 1:
            if(year <= 1917) return 24;
            if(year <= 2041) return 23;
            return 22;
        case 2:
            if(year <= 1946) return 24;
            if(year <= 2074) return 23;
            return 22;
        case 3:
            if(year <= 1979) return 24;
            return 23;
    }
}
 
// 指定した年月のnum回目の月曜日が何日かを取得
export function happyMonday(year, month, num) {
    // 指定した月の1日が何曜日かを調べる
    var getDay = new Date(year, month - 1, 1).getDay();
    // 日曜日か月曜日の場合
    if(getDay <= 1) {
        var day = 2 - getDay;
    // 火曜日～土曜日の場合
    } else {
        var day = 9 - getDay;
    }
    return day + (7 * (num - 1));
}
 
// 振替休日の取得
export function substituteDay(year, month, day, holidayList) {
    // 1973年以降のみ
    if(year >= 1973) {
        // 指定した日の曜日を調べる
        var date = new Date(year, month - 1, day);
        var getDay = date.getDay();
        // 日曜日の場合
        if(getDay === 0) {
            var flag = false;
 
            // 翌日が祝日でないかを調べる
            while(!flag) {
                flag = true;
                date.setDate(date.getDate() + 1);
                for (var i = 0; i < holidayList.length; i++) {
                    // 翌日が祝日の場合
                    if(date.getFullYear() >= holidayList[i]['startY'] && date.getFullYear() <= holidayList[i]['endY'] && (date.getMonth() + 1 + '/' + date.getDate()) === holidayList[i]['date']) {
                        flag = false;
                    }
                }
            }
 
            return date.getMonth() + 1 + '/' + date.getDate();
        }
    }
    return false;
}
 
// 国民の休日の取得
export function nationalHoliday(year, month, day, holidayList) {
    // 1988年以降のみ
    if(year >= 1988) {
        // 指定した日の翌々日を取得
        var date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 2);
 
        var holidayFlag = false;
        for (var i = 0; i < holidayList.length; i++) {
            // 指定した日の翌々日が祝日かどうかを調べる
            if(date.getFullYear() >= holidayList[i]['startY'] && date.getFullYear() <= holidayList[i]['endY'] && (date.getMonth() + 1 + '/' + date.getDate()) === holidayList[i]['date']) {
                holidayFlag = true;
            }
        }
 
        // 指定した日の翌々日が祝日の場合
        if(holidayFlag) {
            // 挟まれた日が祝日かどうかを調べる
            date.setDate(date.getDate() - 1);
            holidayFlag = false;
 
            for (var i = 0; i < holidayList.length; i++) {
                // 挟まれた日が祝日の場合
                if(date.getFullYear() >= holidayList[i]['startY'] && date.getFullYear() <= holidayList[i]['endY'] && (date.getMonth() + 1 + '/' + date.getDate()) === holidayList[i]['date']) {
                    holidayFlag = true;
                }
            }
            // 挟まれた日が祝日でない場合は国民の休日
            if(!holidayFlag) {
                return date.getMonth() + 1 + '/' + date.getDate();
            }
        }
    }
    return false;
}

