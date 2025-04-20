describe('Проверка авторизации', function () {

    it('№1. Позитивный кейс авторизации', function () {
         cy.visit('https://login.qa.studio'); // Зайти на сайт
         cy.get('#mail').type('german@dolnikov.ru'); // Ввести почту
         cy.get('#pass').type('iLoveqastudio1'); //Ввести пароль
         cy.get('#loginButton').click(); // Кликнуть на кнопку "Войти"
         cy.get('#messageHeader').should('be.visible'); // Убедиться что окно видимое 
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверка наличия текста "Авторизация прошла успешно"
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверить наличие видимого крестика
     })

     it('№2. Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type('german@dolnikov.ru');
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

     it('№3. Верный логин и неверный пароль', function () {
         cy.visit('https://login.qa.studio');
         cy.get('#mail').type('german@dolnikov.ru');
         cy.get('#pass').type('iLoveqastudio2');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
     it('№4. Неправильный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('stass911@gmail.com');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('#5. Валидация на наличие @', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('cucumber.ru');
        cy.get('#pass').type('password');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('№6. Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('geRmaN@dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })


 })
 