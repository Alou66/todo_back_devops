import { ApiError } from "../helpers/http-error.js"

/** Valide req[source] avec un schéma Zod et remplace req[source] par la donnée parsée (types coercés, defaults appliqués). */
export function validate(schema, source = "body") {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source])
    if (!result.success) {
      return next(ApiError.badRequest("Données invalides", result.error.flatten()))
    }
    req[source] = result.data
    next()
  }
}
