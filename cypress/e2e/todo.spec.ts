describe("Todo App", () => {
  it("loads the home page and navigate to /todo", () => {
    cy.visit("/");
    cy.contains("Click on me").click();
    cy.url().should("include", "/todo");
  });

  it("adds a new todo", () => {
    cy.visit("/todo");
    cy.get('input[placeholder="Add new task here..."] ').type("Test task");
    cy.contains("Add").click();
    cy.contains("Test task").should("exist");
  });
});
