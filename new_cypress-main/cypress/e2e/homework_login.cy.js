import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json";
import * as result_page from "../locators/result_page.json";

describe('Авторизация', function () {

    beforeEach('Сделать до теста', function() {
        cy.visit('/'); //заходим на сайт в начале кадого теста по base url
    });

    afterEach('в конце теста', function() {
        cy.get(result_page.close).should('be.visible');//проверка наличия крестика
    });

    it('Верные логин и пароль', function () {
         cy.get(main_page.email).type(data.login); // ввели правильную почту
         cy.get(main_page.password).type(data.password); //ввели правильный пароль
         cy.get(main_page.login_button).click(); //нажали войти
         cy.get(result_page.title).contains('Авторизация прошла успешно');//проверка текста успешной авторизации
     })

     it('забыли пароль', function () {
        cy.get(main_page.fogot_pass_btn).click();//нажали "забыл пароль"
        cy.get(recovery_password_page.email).type(data.login);//ввели почту для получения кода
        cy.get(recovery_password_page.send_button).click();//нажали отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail') //проверка текста успешной авторизации
    })

    it('Правильный логин неправильный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввели правильную почту
        cy.get(main_page.password).type(data.ne_password); //ввели неправильный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверка текста успешной авторизации
    })

    it('Неправильный логин и правильный пароль', function () {
        cy.get(main_page.email).type(data.ne_login); // ввели неправильную почту
        cy.get(main_page.password).type(data.password); //ввели правильный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверка текста успешной авторизации
    })

    it('Почта без @', function () {
        cy.get(main_page.email).type('germanydolnikov.ru'); // ввели почту без @
        cy.get(main_page.password).type(data.password); //ввели правильный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');//проверка текста успешной авторизации
    })

    it('приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели почту c заглавными буквами
        cy.get(main_page.password).type(data.password); //ввели правильный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Авторизация прошла успешно');//проверка текста успешной авторизации
    })
 }) 