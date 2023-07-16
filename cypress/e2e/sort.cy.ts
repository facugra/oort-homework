describe("User sorts", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173/login");

    const validEmail = "facugra21@gmail.com";
    const validPassword = "Testing123!";

    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");
  });

  it("should apply sort order when a filter button is clicked", () => {
    cy.get('[data-testid="filterButton"]').contains("Name").click();
    cy.get('[data-testid="loader"]').should("be.visible");

    cy.get('[data-testid="instanceName"]')
      .eq(0)
      .invoke("text")
      .should("be.equal", "ZetaServer");
  });
});
