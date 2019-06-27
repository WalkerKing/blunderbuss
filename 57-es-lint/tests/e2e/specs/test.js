// https://docs.cypress.io/api/introduction/api.html

describe('登录', () => {
    it('访问登录页面', () => {
        cy.visit('/#/login')
        cy.contains('h1', '档案管理系统')
    })
    it('忘记密码链接', () => {
        cy.visit('/#/login')
        cy.contains('忘记密码?').click()
        cy.url().should('include', '/#/password')
    })
    it('正常登陆', () => {
        cy.visit('/#/login')
        cy.contains('h1', '档案管理系统')

        cy.get('input[placeholder="手机号码"]').type('18310617105').should('have.value', '18310617105')
        cy.get('input[placeholder="密码"]').type('123qwe').should('have.value', '123qwe')
        cy.get('input[placeholder="验证码"]').type('asdf').should('have.value', 'asdf')

        cy.get('.button').click()

        cy.url().should('include', '/#/home')
    })
})

describe('忘记密码', () => {
    it('访问忘记密码', () => {
        cy.visit('/#/password')
        cy.contains('p', '找回密码')
    })
    it('马上登录链接', () => {
        cy.visit('/#/password')
        cy.contains('马上登陆').click()
        cy.url().should('include', '/#/login')
    })
    it('正常修改密码', () => {
        cy.visit('/#/password')

        // 输入手机号，验证码
        cy.get('input[data-test-mobile]').type('18310611234').should('have.value', '18310611234')
        cy.get('button[data-test-sendSMS]').click()
        cy.get('input[data-test-code]').type('100000').should('have.value', '100000')
        cy.get('button[data-test-step1Btn]').click()

        // 输入修改密码
        cy.get('input[data-test-newPassword]').type('123qwe').should('have.value', '123qwe')
        cy.get('input[data-test-repeatNewPassword]').type('123qwe').should('have.value', '123qwe')
        cy.get('button[data-test-step2Btn]').click()

        cy.contains('重置密码成功')
        cy.get('button[data-test-step3Btn]').click()

        cy.url().should('include', '/#/login')
    })
})
