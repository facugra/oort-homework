import FilterBar from "./FilterBar";

describe("FilterBar component", () => {
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

  it("should render the correct number of filter buttons", () => {
    const sortBy = "InstanceId";
    const sortDirection = "asc";

    cy.mount(
      <FilterBar
        instances={instances}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortBy={() => null}
      />
    );

    cy.get('[data-testid="filterButton"]').should(
      "have.length",
      Object.keys(instances[0]).length
    );
  });

  it("should call the onSortBy callback with the correct property when a filter button is clicked", () => {
    const sortBy = "InstanceId";
    const sortDirection = "asc";
    const onSortByStub = cy.stub();

    cy.mount(
      <FilterBar
        instances={instances}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortBy={onSortByStub}
      />
    ).then(() => {
      cy.get('[data-testid="filterButton"]')
        .contains("Name")
        .click()
        .then(() => {
          expect(onSortByStub).to.be.calledOnceWith("Name");
        });
    });
  });
});
