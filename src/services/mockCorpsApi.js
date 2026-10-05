export async function getDemoProfile() {
  await new Promise(resolve => setTimeout(resolve, 200))
  return { name: 'Gideon Adewale', state: 'Osun State', lga: 'Osogbo', corpsId: 'DEMO-CORP-2026-001', serviceStatus: 'Serving Corps Member', isDemo: true }
}
