import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

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
        url:
          process.env.PUBLIC_API_URL ??
          `http://localhost:${process.env.PORT ?? 2567}`,
        description: "Development server",
      },
    ],
  },
  apis: [path.join(__dirname, "../api/routes/**/*.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
