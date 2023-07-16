import InstanceCard from "./InstanceCard";

describe("InstanceCard component", () => {
  const instance = {
    InstanceId: "i-1234567890abcdef",
    Name: "Example Instance",
    InstanceType: "t2.micro",
    State: "running",
    AvailabilityZone: "us-west-2",
    PublicIpAddress: "203.0.113.1",
    PrivateIpAddress: "10.0.0.1",
  };

  it("should render the instance name correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.get('[data-testid="instanceName"]').should("have.text", instance.Name);
  });

  it("should render the instance ID correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.contains(`ID: ${instance.InstanceId}`);
  });

  it("should render the instance type badge correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.contains(`Type: ${instance.InstanceType}`).should(
      "have.css",
      "background-color",
      "rgb(164, 196, 249)"
    );
  });

  it("should render the availability zone badge correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.contains(`AZ: ${instance.AvailabilityZone}`).should(
      "have.css",
      "background-color",
      "rgb(240, 147, 195)"
    );
  });

  it("should render the instance state badge correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.contains(`State: ${instance.State}`).should(
      "have.css",
      "background-color",
      "rgb(120, 209, 141)"
    );
  });

  it("should render the public IP correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.contains(`Public IP: ${instance.PublicIpAddress}`);
  });

  it("should render the private IP correctly", () => {
    cy.mount(<InstanceCard instance={instance} />);

    cy.contains(`Private IP: ${instance.PrivateIpAddress}`);
  });

  it('should render "Unavailable" for public IP when it is empty', () => {
    const instanceWithoutPublicIP = { ...instance, PublicIpAddress: "" };

    cy.mount(<InstanceCard instance={instanceWithoutPublicIP} />);

    cy.contains("Public IP: Unavailable");
  });
});
