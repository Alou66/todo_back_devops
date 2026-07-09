export function toLabelResponse(label) {
  return {
    id: label.id,
    name: label.name,
    color: label.color,
  }
}
