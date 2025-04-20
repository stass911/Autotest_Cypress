describe('Pokenons покупка аватара', function () {

    it('Покупка премиума для своего тренера', function () {
        cy.visit('https://pokemonbattle.ru/'); // Зайти на сайт
        cy.get('#k_email').should('be.visible');// Проверка, что инпут ввода почты стал видимый, т.к. без этого тест часто ломался при запуске (обычно первый запуск)

         cy.get('#k_email').type('stass911@gmail.com'); //Ввод валидной почты
         cy.get('#k_password').type('dcskzBMLJB98eeP'); //Ввод валидного пароля
         cy.get('.MuiButton-root').click(); //Клик на кнопку "Войти"
         cy.get('.header_card_trainer').click() //Клик для перехода на страницу тренера
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // Клик на раздел "Смена аватара"
         cy.get('.available > button').first().click(); // Кликаем на доступный аватар 
         cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4466746825950006') // Номер карты 4466746825950006
         
         cy.wait(500) //Подождать 500 милисекунд  (без этого тест периодически ломался), можно и другим способом исправить, но не стал заморачиваться

         cy.get(':nth-child(1) > .style_1_base_input').type('06/27')// Срок 06/27
         cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125') //CVV 125
         cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('VASILIY PUPKIN')//ИМЯ VASILIY PUPKIN
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click() // Кликнуть по кнопке "Оплатить"
         cy.get('.style_1_base_input').type('56456') // Пароль от СМС 56456
         
         //cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click () //Клик по кнопке "Оплатить" 

         // Здесь тест ломался, т.к. кнопка "Вернуться в магазин" появлялась с задержкой
         
         //cy.wait(1000) //Использовал это - помогло, но решил дальше чуть усложнить

         //А эти с этими командами мне помог ChatGPT. Заметил, что этот способ сильно ускоряет тестирование
         
         // 1.Перехват GET-запроса к /api/data и присвоение алиаса 
         cy.intercept('GET', 'https://api.pokemonbattle.ru/v2/technical_routes/get_options').as('getData')
    
         // 2. Действие, инициирующее запрос, например, нажатие кнопки, в данном случае нажатие кнопки "Оплатить"
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click () //Клик по кнопке "Оплатить"
         
         // 3. Ожидание завершения запроса и проверка статуса ответа
         cy.wait('@getData').its('response.statusCode').should('eq', 200)// Убедились что бек прислал двухсотку

         cy.get('.style_1_base_link_blue').click() // Клик на кпопку "Вернуться в магазин"
    
         cy.get('.header_interactive_button_exit > .interactive_button > .wrapper_img').click() // Разлогиниться
         cy.wait('@getData').its('response.statusCode').should('eq', 200)// Убедились что бек прислал двухсотку

         //Тест на видимость элементов не делал осознанно
     })
 }) 