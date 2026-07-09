import { z } from "zod"

export const taskStatusEnum = z.enum(["todo", "in_progress", "done"])
export const taskPriorityEnum = z.enum(["low", "medium", "high", "urgent"])

export const idParamSchema = z.object({
  id: z.uuid("Identifiant invalide"),
})

const taskShape = {
  title: z.string().trim().min(1, "Le titre est requis"),
  description: z.string(),
  status: taskStatusEnum,
  priority: taskPriorityEnum,
  dueDate: z.iso.date("Date invalide (attendu AAAA-MM-JJ)").nullable(),
  assigneeId: z.uuid("Identifiant de membre invalide").nullable(),
  labelIds: z.array(z.uuid("Identifiant d'étiquette invalide")),
}

// Schéma de création : les champs optionnels ont une valeur par défaut.
export const createTaskSchema = z.object({
  ...taskShape,
  description: taskShape.description.default(""),
  status: taskShape.status.default("todo"),
  priority: taskShape.priority.default("medium"),
  dueDate: taskShape.dueDate.default(null),
  assigneeId: taskShape.assigneeId.default(null),
  labelIds: taskShape.labelIds.default([]),
})

// Schéma de mise à jour : tous les champs optionnels, sans défaut, pour ne
// jamais écraser un champ absent du body d'un PATCH partiel.
export const updateTaskSchema = z.object(taskShape).partial()

export const reorderTasksSchema = z.array(
  z.object({
    id: z.uuid("Identifiant invalide"),
    status: taskStatusEnum,
    order: z.number().int().min(0),
  })
)
