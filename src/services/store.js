import { supabase } from '../lib/supabase'
const KEY = 'corpersafe-demo-v1'
const initial = {
  profile: { name: 'Gideon Adewale', state: 'Osun State', lga: 'Osogbo', corpsId: 'DEMO-CORP-2026-001', serviceStatus: 'Serving Corps Member', isDemo: true },
  contacts: [{ id: 'mum', name: 'Mum', relationship: 'Parent', phone: '080•••••1042' }, { id: 'brother', name: 'Brother', relationship: 'Family', phone: '080•••••8821' }, { id: 'cds', name: 'CDS President', relationship: 'CDS', phone: '080•••••3108' }],
  vehicle: { plate: 'ABC 123 XY', vehicle: 'Toyota Hiace', colour: 'White', status: 'verified' },
  trip: { id: 'demo-trip', departure: 'Oke-Fia Motor Park, Osogbo', destination: 'Ibadan, Oyo State', vehicle: 'Toyota Hiace', plate: 'ABC 123 XY', contacts: ['Mum'], status: 'active', startedAt: new Date().toISOString(), due: '11:00 AM', checkedIn: false },
  incidents: [{ id: 'CS001', category: 'Unsafe location', location: 'Iwo Road, Ibadan', description: 'Demo incident for responder review.', status: 'Under Review', createdAt: new Date().toISOString() }],
  alerts: [{ id: 'EA001', type: 'Vehicle diverted from expected route', status: 'Alerted', createdAt: new Date().toISOString() }], notifications: [],
}
function read() { try { const saved = JSON.parse(localStorage.getItem(KEY) || '{}'); const next = { ...initial, ...saved }; if (next.trip && !next.trip.contacts) next.trip.contacts = next.trip.contact ? [next.trip.contact] : []; return next } catch { return initial } }
let state = read()
const listeners = new Set()
function emit() { localStorage.setItem(KEY, JSON.stringify(state)); listeners.forEach(fn => fn(state)) }
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
export function getState() { return state }
async function signedInUserId() {
  if (!supabase) return null
  try { const { data, error } = await supabase.auth.getUser(); return error ? null : data.user?.id || null }
  catch { return null }
}
export async function saveTrip(trip) {
  const userId = await signedInUserId()
  if (userId) {
    const { error } = await supabase.from('trips').insert({ profile_id: userId, departure: trip.departure, destination: trip.destination, status: 'active', started_at: trip.startedAt, safety_checkin_due: trip.due })
    if (error) console.warn('Supabase trip persistence unavailable; saved locally.', error.message)
  }
  state.trip = { ...trip, id: crypto.randomUUID(), status: 'active', checkedIn: false }; emit(); return state.trip
}
export async function saveIncident(incident) {
  const existingRefs = state.incidents.map(item => Number(item.id?.match(/^CS-2026-(\d+)$/)?.[1]) || 420)
  const nextRef = Math.max(420, ...existingRefs) + 1
  const entry = { ...incident, id: `CS-2026-${String(nextRef).padStart(5, '0')}`, status: 'Reported', createdAt: new Date().toISOString() }
  const userId = await signedInUserId()
  if (userId) {
    const { error } = await supabase.from('incidents').insert({ profile_id: userId, category: entry.category, description: entry.description, location: entry.location, status: 'Reported' })
    if (error) console.warn('Supabase incident persistence unavailable; saved locally.', error.message)
  }
  state.incidents = [entry, ...state.incidents]; emit(); return entry
}
export async function saveAlert(alert) { state.alerts = [{ ...alert, id: crypto.randomUUID(), status: 'Alerted', createdAt: new Date().toISOString() }, ...state.alerts]; emit(); return state.alerts[0] }
export function checkIn() { if (state.trip) { state.trip.checkedIn = true; state.trip.missedCheckin = false } emit() }
export function simulateMissedCheckin() { if (state.trip) state.trip.missedCheckin = true; emit() }
export function endTrip() { if (state.trip) state.trip.status = 'completed'; emit() }
export function updateIncident(id, status) { state.incidents = state.incidents.map(i => i.id === id ? { ...i, status } : i); emit() }
export function addContact(contact) { state.contacts = [...state.contacts, { ...contact, id: crypto.randomUUID() }]; emit() }
export function removeContact(id) { state.contacts = state.contacts.filter(c => c.id !== id); emit() }
export function addNotification(notification) { state.notifications = [notification, ...state.notifications]; emit() }
