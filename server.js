import { app } from "./src/app.js"
import { env } from "./src/config/env.js"

app.listen(env.PORT, () => {
  console.log(`API disponible sur http://localhost:${env.PORT}/api`)
  console.log(`Documentation Swagger sur http://localhost:${env.PORT}/api-docs`)
})
