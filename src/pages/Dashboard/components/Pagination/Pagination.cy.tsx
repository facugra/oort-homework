import Pagination from "./Pagination";

describe("Pagination component", () => {
  it("should render the correct number of page buttons", () => {
    const totalItems = 100;
    const pageSize = 10;
    const currentPage = 1;
    const onPageChangeStub = cy.stub();

    cy.mount(
      <div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChangeStub}
        />
      </div>
    );

    cy.get('[data-testid="paginationContainer"]')
      .find('[data-testid="paginationPage"]')
      .should("have.length", Math.ceil(totalItems / pageSize));
  });

  it('should navigate to the previous page when "Prev" button is clicked', () => {
    const totalItems = 100;
    const pageSize = 10;
    const currentPage = 4;
    const onPageChangeStub = cy.stub();

    cy.mount(
      <div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChangeStub}
        />
      </div>
    );

    cy.get('[data-testid="paginationPrevButton"]')
      .click()
      .then(() => {
        expect(onPageChangeStub).to.be.calledOnceWith(currentPage - 1);
      });
  });

  it('should navigate to the next page when "Next" button is clicked', () => {
    const totalItems = 100;
    const pageSize = 10;
    const currentPage = 1;
    const onPageChangeStub = cy.stub();

    cy.mount(
      <div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChangeStub}
        />
      </div>
    );

    cy.get('[data-testid="paginationNextButton"]')
      .click()
      .then(() => {
        expect(onPageChangeStub).to.be.calledOnceWith(currentPage + 1);
      });
  });

  it("should call the onPageChange callback when a page button is clicked", () => {
    const totalItems = 100;
    const pageSize = 10;
    const currentPage = 1;
    const onPageChangeStub = cy.stub();

    cy.mount(
      <div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChangeStub}
        />
      </div>
    );

    cy.get('[data-testid="paginationPage"]')
      .contains("3")
      .click()
      .then(() => {
        expect(onPageChangeStub).to.be.calledOnceWith(3);
      });
  });

  it("should call the onPageSizeChange callback when the select value is changed", () => {
    const totalItems = 100;
    const pageSize = 10;
    const onPageSizeChangeStub = cy.stub();

    cy.mount(
      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={1}
        onPageChange={() => null}
        onPageSizeChange={onPageSizeChangeStub}
      />
    );

    cy.get('[data-testid="paginationSelect"]')
      .select("50")
      .then(() => {
        expect(onPageSizeChangeStub).to.be.calledOnceWith(50);
      });
  });
});
