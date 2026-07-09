import swaggerJsdoc from "swagger-jsdoc"
import { env } from "./env.js"

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Todo App API",
      version: "1.0.0",
      description: "API REST pour la gestion de tâches, étiquettes et membres d'équipe.",
    },
    servers: [{ url: `http://localhost:${env.PORT}/api` }],
  },
  apis: ["./src/modules/**/*.routes.js", "./src/routes/*.js"],
}

export const swaggerSpec = swaggerJsdoc(options)
