import { mount } from "@cypress/react";
import ProductList from "./ProductList";

describe("ProductList Component", () => {
  beforeEach(() => {
    mount(<ProductList />);
  });

  it("product list renders and displays the title", () => {
    cy.contains("Product").should("be.visible");
  });

  it("should render product items from API", () => {
    cy.get('[data-testid="product-card"]', { timeout: 10000 }).should(
      "have.length.at.least",
      1
    );
  });

  it("should open cart on clicking cart icon", () => {
    cy.get('[data-testid="cart-icon"]').click();
    cy.contains("Cart").should("be.visible");
  });
});
