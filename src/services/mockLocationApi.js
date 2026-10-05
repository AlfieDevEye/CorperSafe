export async function getDemoLocation() {
  await new Promise(resolve => setTimeout(resolve, 180))
  return { label: 'Near me · Demo location', latitude: null, longitude: null, isSimulated: true }
}
