// カレンダーが入る表のhtmlを構築します
export function contructCalenderMold(){
    var rows = [];

    var table = document.createElement('table');
    table.cellSpacing = 1;

    var calenderRowNum = 6;
    calenderRowNum += 1; // 曜日部分に1行
    var calenderColNum = 7;
    
    for(let i = 0; i < calenderRowNum; i++){
        rows.push(table.insertRow(-1));
        for(let j = 0; j < calenderColNum; j++){
            var cell = rows[i].insertCell(-1);
            if (i == 0){
                cell.className = 'legend';
                cell.appendChild(moldCalenderLegend());
            } else {
                cell.className = 'date'
                cell.appendChild(moldCalenderContent());
            }
        }
    }
    document.getElementById('calender').removeChild(document.getElementById('calender').childNodes[0]);
    document.getElementById('calender').appendChild(table);
}

// 曜日部分のelement tree
export function moldCalenderLegend(){
    var divWrapper = document.createElement('div');
    var pLegend = document.createElement('p');
    divWrapper.className = 'legend-wrapper';
    pLegend.className = 'legend';
    divWrapper.appendChild(pLegend);
    return divWrapper
}

// 日付け部分のelement tree
export function moldCalenderContent(){
    var divWrapper = document.createElement('div');
    var divUpper = document.createElement('div');
    var divLower = document.createElement('div')
    var img = document.createElement('img');
    var pDayNumber = document.createElement('p');
    var pDayText = document.createElement('p');

    divWrapper.className = 'content-wrapper';
    divUpper.className = 'upper-part';
    divLower.className = 'lower-part';
    img.src = "";
    img.alt = "";
    pDayNumber.className = 'day-number';
    pDayText.className = 'day-text';

    divUpper.appendChild(pDayNumber);
    divUpper.appendChild(pDayText);
    divLower.appendChild(img);
    divWrapper.appendChild(divUpper);
    divWrapper.appendChild(divLower);

    return divWrapper;
}
