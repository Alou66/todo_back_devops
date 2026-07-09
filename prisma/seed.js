import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.taskLabel.deleteMany()
  await prisma.task.deleteMany()
  await prisma.label.deleteMany()
  await prisma.member.deleteMany()

  const [amina, karim, sarah] = await Promise.all([
    prisma.member.create({
      data: { name: "Amina Diallo", email: "amina@madishop.dev", role: "Product Owner", color: "#6366f1" },
    }),
    prisma.member.create({
      data: { name: "Karim Traoré", email: "karim@madishop.dev", role: "Développeur", color: "#0ea5e9" },
    }),
    prisma.member.create({
      data: { name: "Sarah Konaté", email: "sarah@madishop.dev", role: "Designer", color: "#f59e0b" },
    }),
  ])

  const [bug, feature, client, interne] = await Promise.all([
    prisma.label.create({ data: { name: "Bug", color: "#ef4444" } }),
    prisma.label.create({ data: { name: "Fonctionnalité", color: "#14b8a6" } }),
    prisma.label.create({ data: { name: "Client", color: "#a855f7" } }),
    prisma.label.create({ data: { name: "Interne", color: "#64748b" } }),
  ])

  await prisma.task.create({
    data: {
      title: "Préparer la démo client",
      description: "Rassembler les maquettes et le script de présentation.",
      status: "todo",
      priority: "urgent",
      dueDate: new Date("2026-07-15"),
      order: 0,
      assigneeId: amina.id,
      labels: { create: [{ labelId: client.id }] },
    },
  })

  await prisma.task.create({
    data: {
      title: "Corriger le bug de synchronisation des stocks",
      description: "Le stock affiché ne se met pas à jour après une vente en caisse.",
      status: "todo",
      priority: "high",
      dueDate: new Date("2026-07-12"),
      order: 1,
      assigneeId: karim.id,
      labels: { create: [{ labelId: bug.id }] },
    },
  })

  await prisma.task.create({
    data: {
      title: "Concevoir le nouveau logo des reçus",
      description: "Proposer 2-3 variantes pour validation par la direction.",
      status: "in_progress",
      priority: "medium",
      dueDate: new Date("2026-07-18"),
      order: 0,
      assigneeId: sarah.id,
      labels: { create: [{ labelId: feature.id }] },
    },
  })

  await prisma.task.create({
    data: {
      title: "Auditer les accès des comptes internes",
      description: "Vérifier que chaque compte a le bon niveau d'accès.",
      status: "done",
      priority: "low",
      dueDate: null,
      order: 0,
      assigneeId: amina.id,
      labels: { create: [{ labelId: interne.id }] },
    },
  })

  console.log("Seed terminé.")
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
