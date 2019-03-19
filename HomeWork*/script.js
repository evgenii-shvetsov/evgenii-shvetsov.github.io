'use strict';

class Container {
    constructor(){
        this.id = '';
        this.className = '';
        this.htmlCode = '';
        this.name = '';
        this.phone = '';
        this.email = '';
        this.text = '';
    }
    render () {
        return this.htmlCode;
    }

}


class Form extends Container {
    constructor (myId, myClass, myName, myPhone, myEmail, myText){
        super();
        this.id = myId;
        this.className = myClass;
        this.name = myName;
        this.phone = myPhone;
        this.email = myEmail;
        this.text = myText;
    }
    // Вставка значений в поля формы
    fill () {
        document.getElementById('form__input-name').value = this.name;
        document.getElementById('form__input-phone').value = this.phone;
        document.getElementById('form__input-email').value = this.email;
        document.getElementById('form__text').value = this.text;
    }
    // Проверка полей формы на соответствие
    validate (myIds, myTypes) {
        for (let i in myTypes) {
            let myType = myTypes[i];
            let myId = 'form__input-' + myType;
            let field = document.getElementById(myId);
            let message = document.getElementById('form__message-' + myType);
            let reg = "";

            switch (myType) {
                case "name":
                    // Имя
                    reg = /^[A-zА-я]+$/;
                    break;
                case "phone":
                    // +7(000)000-0000
                    reg = /^\+[7|8]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
                    break;
                case "email":
                    // mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
                    reg = /^([A-zА-я0-9_-]+\.)*[A-zА-я0-9_-]+@[A-zА-я0-9_-]+(\.[A-zА-я0-9_-]+)*\.[A-zА-я]{2,6}$/;
                    break;
            }

            if (field.value.search(reg) == -1) {
                field.style.borderColor = 'red';
                message.innerHTML = 'Проверьте правильность заполнения поля!';
            } else {
                field.style.borderColor = '#85c799';
                message.innerHTML = '';
            }

        }
    }
}


// Загрузка информации в поля формы из файла JSON через AJAX
document.getElementById('form__button-load').addEventListener ('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.myjson.com/bins/uk1o2', true);
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log('Error', xhr.status, xhr.statusText);
        } else {
            let fileJson = JSON.parse(xhr.responseText);
            let formNew = new Form('formId', 'formClass', fileJson.name, fileJson.phone, fileJson.email, fileJson.text);
            
            formNew.fill();
        }
    }
    xhr.send();
});

// Отслеживание события "submit" формы
document.getElementById('form').addEventListener ('submit', (e) => {
    e.preventDefault();

    let formNew = new Form('formId', 'formClass', 
        document.getElementById('form__input-name').value,
        document.getElementById('form__input-phone').value,
        document.getElementById('form__input-email').value,
        document.getElementById('form__text').value);

    formNew.validate('form__input', ['name', 'phone', 'email']);
});

