describe("Dashboard component", () => {
  const instances = [
    {
      InstanceId: "i-1234567890abcdef",
      Name: "Example Instance",
      InstanceType: "t2.micro",
      State: "running",
      AvailabilityZone: "us-west-2",
      PublicIpAddress: "203.0.113.1",
      PrivateIpAddress: "10.0.0.1",
    },
  ];

  before(() => {
    cy.intercept("POST", Cypress.env("instancesEndpoint"), {
      body: {
        list: instances,
        count: instances.length,
      },
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the page title", () => {
    cy.contains("Dashboard");
  });

  it("should display the logout button", () => {
    cy.contains("Logout");
  });

  it("should display the loading spinner while fetching data", () => {
    cy.get('[data-testid="loader"]').should("exist");
  });

  it("should display the filter bar", () => {
    cy.get('[data-testid="filterBar"]').should("exist");
  });

  it("should display the instance cards after data is loaded", () => {
    cy.get('[data-testid="loader"]').should("not.exist");
    cy.get('[data-testid="instanceName"]').should(
      "have.length",
      instances.length
    );
  });

  it("should display a message when no instances are found", () => {
    cy.intercept("POST", Cypress.env("instancesEndpoint"), {
      body: {
        list: [],
        count: 0,
      },
    });

    cy.reload();
    cy.contains("No instances found.");
  });

  it("should update the instances data when sorting by a property", () => {
    const sortBy = "Name";
    const sortDirection = "asc";
    const filters = {
      sortBy,
      sortDirection,
      page: 1,
      pageSize: 10,
    };

    cy.intercept("POST", Cypress.env("instancesEndpoint"), (req) => {
      expect(req.body).to.deep.equal(filters);
      req.reply({
        body: {
          list: instances,
          count: instances.length,
        },
      });
    });

    cy.get('[data-testid="filterButton"]').contains(sortBy).click();
    cy.wait(1000);
    cy.get('[data-testid="instanceName"]').should(
      "have.length",
      instances.length
    );
  });
});
