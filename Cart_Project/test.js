//XMLHttpRequest = XHR


//Отправка запросов в браузер идет с помощью объекта XMLHttpRequest
function getXhr() {
    if(window.XMLHttpRequest) return new XMLHttpRequest();
    return new window.ActiveXObject ('Microsoft.XMLHTTP')
}

const xhr = getXhr();


//Определяем куда отправить запрос,  true- говорит не блокировать выполнение скриптов на странице, false же прервет подгрузку скрипта, пока сам не прогрузится
xhr.open('GET', 'ссылка на url', true);

/*
// выставляем таймер  для xhr
xhr.timeout = 15000;

//если таймаут истек и запрос не выполнился то срабатывает функция ontimeout
xhr.ontimeout = function(){}
*/


//чтобы поймать момент когда от сервера получен ответ используем onreadystatechange (обновляет состояние xhr запроса) 4-запрос выполнен, 200- запрос выполнен успешно на сервере
xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
        const goodsArr = JSON.parse(xhr.responseText)
        console.log(goodsArr)// ответ от сервера- текстовая строка, тот файл который мы передали в виде строки
    }
}

//для отправки xhr запроса используем метод send()
xhr.send();