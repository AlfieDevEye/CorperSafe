export async function notifyTrustedContact(contact, message) {
  await new Promise(resolve => setTimeout(resolve, 450))
  return { delivered: true, channel: 'demo in-app', contact: contact.name, message, notifiedAt: new Date().toISOString() }
}
