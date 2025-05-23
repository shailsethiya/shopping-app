import { mount } from "@cypress/react";
import Cart from "./Cart";

const mockItems = [
  { title: "Product A", price: 10, quantity: 2 },
  { title: "Product B", price: 20, quantity: 1 },
];

describe("Cart Component", () => {
  it("renders empty cart message when no items", () => {
    mount(<Cart items={[]} open={true} onClose={cy.stub()} />);
    cy.contains("Cart").should("be.visible");
    cy.contains("Cart is empty").should("be.visible");
  });

  it("displays cart items and total", () => {
    mount(<Cart items={mockItems} open={true} onClose={cy.stub()} />);
    cy.contains("Cart").should("be.visible");
    cy.contains("Product A").should("be.visible");
    cy.contains("Product B").should("be.visible");
    cy.contains("Total:").should("be.visible");
    cy.contains("$40.00").should("be.visible"); // 10*2 + 20*1
  });

  it("calls onClose when close icon is clicked", () => {
    const onCloseSpy = cy.stub().as("onCloseSpy");
    mount(<Cart items={mockItems} open={true} onClose={onCloseSpy} />);
    cy.get('button[aria-label="close"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });
});
