describe('Simple Quiz App', () => {
    beforeEach(() => {
        cy.visit('http://15.206.123.243:8081/')  
    });

    it('displays a question with multiple answers', () => {
        cy.get('#question').should('be.visible');
        cy.get('#answer-list').find('input[type="radio"]').should('have.length.greaterThan', 1);
    });

    it('highlights the correct answer in green when submitted', () => {
        // The first question's correct answer is the third option
        cy.get('#answer-list li:nth-child(3)').should('not.have.css', 'background-color', 'rgb(144, 238, 144)'); // rgb for lightgreen
        cy.get('#answer-list li:nth-child(3) input').check();
        cy.get('#submit').click();
        cy.get('#answer-list li:nth-child(3)').should('have.css', 'background-color', 'rgb(144, 238, 144)'); // rgb for lightgreen
    });

    it('highlights the correct answer in green even when the wrong answer is selected', () => {
        // Assuming the first question's correct answer is the third option
        cy.get('#answer-list li:nth-child(1) input').check();
        cy.get('#submit').click();
        cy.get('#answer-list li:nth-child(3)').should('have.css', 'background-color', 'rgb(144, 238, 144)'); // rgb for lightgreen
    });

    it('loads a new question when the next button is clicked', () => {
        cy.get('#question').invoke('text').then(text1 => {
            // cy.wait(5000);
            cy.get('#next').click({force: true});
            cy.get('#question').invoke('text').should('not.eq', text1);
        });
    });

    it('displays score at the end of the quiz', () => {
        // For simplicity, let's assume there are only two questions in the quiz.
        cy.get('#answer-list li:nth-child(3) input').check();
        cy.get('#submit').click();
        cy.get('#next').click();
        cy.get('#answer-list li:nth-child(2) input').check(); // Assuming 2nd answer is correct for the second question
        cy.get('#submit').click();
        cy.get('#next').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Quiz finished! Your score is: 2/2`);
        });
    });

    it('shows an alert if submitted without selecting an answer', () => {
        cy.get('#submit').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please select an answer!');
        });
    });

    it('has the correct padding for the body', () => {
        cy.get('body').should('have.css', 'padding', '50px');
    });

});

