import { mount } from "@cypress/react";
import ProductItem from "./ProductItem";
import type { Product } from "./ProductItem";

describe("ProductItem Component", () => {
  const product: Product = {
    title: "Test Product",
    price: 25,
    description: "This is a test product",
    image: "https://via.placeholder.com/150",
  };

  it("renders product details", () => {
    mount(<ProductItem product={product} onAddToCart={() => {}} />);
    cy.contains("Test Product").should("be.visible");
    cy.contains("$25").should("be.visible");
    cy.contains("This is a test product").should("be.visible");
    cy.get("img").should("have.attr", "alt", "Test Product");
  });

  it("increments quantity on Add to Cart click", () => {
    const onAddToCart = cy.stub().as("addStub");
    mount(<ProductItem product={product} onAddToCart={onAddToCart} />);

    cy.contains("Add to Cart").click();
    cy.get("@addStub").should("have.been.calledOnceWith", product);
    cy.contains("1 in cart").should("be.visible");
  });

  it("increments and decrements quantity correctly", () => {
    const onAddToCart = cy.stub().as("addStub");
    const onRemoveFromCart = cy.stub().as("removeStub");

    mount(
      <ProductItem
        product={product}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    );

    // Add once
    cy.contains("Add to Cart").click();
    cy.get("@addStub").should("have.been.calledOnceWith", product);
    cy.contains("1 in cart");

    // Click plus
    cy.get("button").contains("+").click();
    cy.get("@addStub").should("have.been.calledTwice");
    cy.contains("2 in cart");

    // Click minus
    cy.get("button").contains("-").click();
    cy.get("@removeStub").should("have.been.calledOnceWith", product);
    cy.contains("1 in cart");

    // Click minus to zero quantity
    cy.get("button").contains("-").click();
    cy.get("@removeStub").should("have.been.calledTwice");
    cy.contains("Add to Cart").should("be.visible");
  });
});
