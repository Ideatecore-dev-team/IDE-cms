/* eslint-disable no-undef */

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login"); // Replace with the actual path if different
  });

  //   check in success
  //   1. success in displaying the login page
  it("should display the login page correctly", () => {
    cy.get("#quote").should("be.visible");
    cy.get("#login").should("be.visible");
    cy.get("img").should("have.attr", "src");
    cy.get("#loginForm").should("be.visible");
    cy.get("input[type='email']").should("be.visible");
    cy.get("input[type='password']").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });

  //   2. success in logging in
  it("should log in successfully with valid credentials", () => {
    cy.get("input[type='email']").type("superadmintest@example.com");
    cy.get("input[type='password']").type("superadmin");
    cy.get("button[type='submit']").click();
    cy.get(".Toastify__toast").should("contain", "Login success");
    cy.url().should("not.include", "/login");
  });

  //   check in failed
  //   1. failed login with empty fields button is disabled
  it("should disable the login button when fields are empty", () => {
    cy.get("button[type='submit']").should("be.disabled");
  });

  //  2. failed login with invalid email
  it("should show validation errors for invalid email and password", () => {
    cy.get("input[type='email']").type("invalid-email");
    cy.get("input[type='password']").type("pass");
    cy.contains("Email is not valid").should("be.visible");
    cy.contains("Password must be at least 8 characters").should("be.visible");
    cy.get("button[type='submit']").should("be.disabled");
  });

  //  3. failed login with wrong email
  it("should show notification errors for wrong email", () => {
    cy.get("input[type='email']").type("notsuperadmintest@example.com");
    cy.get("input[type='password']").type("superadmin");
    cy.get("button[type='submit']").click();
    cy.get(".Toastify__toast").should("contain", "email or password is wrong");
    cy.url().should("include", "/login");
  });

  //  4. failed login with wrong password
  it("should show notification errors for wrong password", () => {
    cy.get("input[type='email']").type("superadmintest@example.com");
    cy.get("input[type='password']").type("notsuperadmin");
    cy.get("button[type='submit']").click();
    cy.get(".Toastify__toast").should("contain", "email or password is wrong");
    cy.url().should("include", "/login");
  });
});
