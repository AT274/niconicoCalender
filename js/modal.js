export var modal = moldModal();

// モーダルの型を作成
export function moldModal(){
    var modal = document.createElement('div');
    var imgSmile = document.createElement('img');
    var imgNormal = document.createElement('img');
    var imgSad = document.createElement('img');

    modal.id = 'modal';
    imgSmile.src = 'img/smile.png'
    imgNormal.src = 'img/normal.png'
    imgSad.src = 'img/sad.png'

    modal.appendChild(imgSmile);
    modal.appendChild(imgNormal);
    modal.appendChild(imgSad);

    return modal;
}

// モーダルの表示
$(document).on('click', '.date', function(){
        // 先に準備しておかないと、１回目の表示スピードがずれます
        var cell = this;
        cell.appendChild(modal);

        // 一度隠す
        $('#modal').hide();
        
        // 日付けが無い部分をクリックしても何も表示しない
        if ($(this).find('.day-number')[0].innerText == ''){
            return
        }

        // クリックされた日付けセルの下にモーダルを表示
        $('#modal').fadeIn(100);
        var position = cell.getBoundingClientRect();;
        var modalY = position.top + 50;
        var modalX = position.left - 20;
        modal.style.top = modalY + 'px';
        modal.style.left = modalX + 'px';
    }, 
);

// ニコニコマークの表示
$(document).on('click', 'img', function(event){
　  var src = $(this).attr('src')
    $('td:has(#modal)').find('img').eq(0).attr('src', src);
    $('#modal').hide();
    event.stopPropagation(); // 再表示をブロック
});
