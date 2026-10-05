export async function createEmergencyAlert(payload) {
  await new Promise(resolve => setTimeout(resolve, 350))
  return { ...payload, id: crypto.randomUUID(), status: 'created', createdAt: new Date().toISOString() }
}
