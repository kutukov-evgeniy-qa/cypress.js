describe('Покемоны е2е покупка аватара', function () {

    it('позитивный кейс', function () {
         cy.visit('https://pokemonbattle.ru/login');
         cy.get(':nth-child(1) > .auth__input').type('user_email');// почта
         cy.get('#password').type('user_pass'); //пароль

         cy.intercept('POST', 'https://api.pokemonbattle.ru/v2/technical_routes/auth_control').as('auth_control');
         cy.intercept('GET', 'https://api.pokemonbattle.ru/v2/pokemons?sort=asc_date&page=1&status=1').as('pokemons');
         cy.get('.auth__button').click(); //нажали войти
         
         cy.wait('@auth_control');
         cy.wait('@pokemons');//ждем ответа на запросы get на список покемонов и post для авторизации

         cy.get('.header__container > .header__id').click({ force: true });//зашли на страницу тренера
         cy.get('[href="/shop"]').click();//перешли в магазин аватаров
         cy.get('.available > button').first().click({ force: true });//нажали на покупку первого по счету доступного аватара
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111111111111111');//ввели номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('0927');//дату карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');//код карты
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('evgeniy kutukov');//имя с карты

         cy.intercept('POST', 'https://api.pokemonbattle.ru/v2/technical_routes/auth_control').as('auth_control2');
         cy.get('.pay-btn').click();//нажали оплатить
         cy.wait('@auth_control2');//ждем ответа на post запрос который иногда руинит тест
         
         cy.get('#cardnumber').type('56456');//ввели код из смс
         cy.get('.payment__submit-button').click();//подтвердили
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно').should('be.visible');//Проверяем что текст об успешной оплате виден пользователю
         cy.get('.payment__adv').click();//вернуться на главную
     })
 }) 
 