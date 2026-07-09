import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { env } from "./config/env.js"
import { swaggerSpec } from "./config/swagger.js"
import { apiRouter } from "./routes/index.js"
import { notFound } from "./middlewares/not-found.js"
import { errorHandler } from "./middlewares/error-handler.js"

export const app = express()

app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/api", apiRouter)

app.use(notFound)
app.use(errorHandler)
