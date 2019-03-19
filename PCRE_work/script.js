// Загрузка информации в поля формы из файла JSON через AJAX
document.getElementById('form__button-load').onclick = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'example.json', true);
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log('Error', xhr.status, xhr.statusText);
        } else {
            let fileJson = JSON.parse(xhr.responseText),
                formNew = new Form('formId', 'formClass', fileJson.name, fileJson.phone, fileJson.email, fileJson.text);
            formNew.fill();
        }
    }
    xhr.send();
};

