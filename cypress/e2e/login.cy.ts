describe("User Login", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173/login");
  });

  it("should display login form", () => {
    cy.get("h2").should("contain", "Login");
    cy.get("form").should("exist");
    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should show error message for invalid credentials", () => {
    cy.get('input[type="email"]').type("invalid-email@example.com");
    cy.get('input[type="password"]').type("invalid-password");
    cy.get('button[type="submit"]').click();
    cy.get("div").should("contain", "Invalid email or password");
  });

  it("should login successfully with valid credentials", () => {
    const validEmail = "facugra21@gmail.com";
    const validPassword = "Testing123!";

    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");
  });
});
