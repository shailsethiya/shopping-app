import { mount } from "@cypress/react";
import CartItem from "./CartItem";

describe("CartItem Component", () => {
  it("displays title, quantity, and total price", () => {
    const props = {
      title: "Sample Product",
      price: 15.5,
      quantity: 3,
    };

    mount(<CartItem {...props} />);

    cy.contains("Sample Product").should("be.visible");
    cy.contains("Quantity: 3").should("be.visible");
    cy.contains("$46.50").should("be.visible"); // 15.5 * 3
  });
});
