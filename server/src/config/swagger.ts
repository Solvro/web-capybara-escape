import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Capybara Escape API",
      version: "1.0.0",
      description: "API documentation for loading and adding levels.",
    },
    servers: [
      {
        url: "http://localhost:2567",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/api/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
