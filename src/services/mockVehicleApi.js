const fixtures = { 'ABC 123 XY': { plate: 'ABC 123 XY', vehicle: 'Toyota Hiace', colour: 'White', status: 'verified' }, 'LAG 456 AB': { plate: 'LAG 456 AB', vehicle: 'Coaster Bus', colour: 'Blue', status: 'verified' } }
export async function verifyVehicle(plateNumber) {
  await new Promise(resolve => setTimeout(resolve, 850))
  const plate = plateNumber.trim().toUpperCase().replace(/\s+/g, ' ')
  if (plate === 'OFFLINE') return { plate, status: 'temporarily_unavailable' }
  return fixtures[plate] ? { ...fixtures[plate], verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : { plate, status: 'not_verified' }
}
