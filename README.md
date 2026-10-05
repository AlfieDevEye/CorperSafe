# CorperSafe

CorperSafe is a responsive hackathon prototype for Corps Members. The root route is a non-functional mock NYSC-style portal with one working CorperSafe entry link. It demonstrates the safety chain **Verify → Record → Connect → Alert → Respond** with fictional data and mock services. It does not connect to NYSC or FRSC systems and does not track a live location.

## Run locally

```sh
npm install
npm run dev
```

Open the Vite URL, select **CorperSafe** in the mock portal navigation, then select **Enter Demo Dashboard**. The original CorperSafe introduction remains at `/corpersafe`; all member and admin workflow routes remain at their existing paths. The first visit seeds a fictional Gideon Adewale profile, a verified demo vehicle, three trusted contacts, an active journey, and sample responder records in browser local storage. Use the plate `ABC 123 XY` for a successful verification; use `OFFLINE` to show the temporary-unavailable state.

## Supabase setup

1. Create a Supabase project.
2. Apply [`supabase/migrations/202610050001_corpersafe_schema.sql`](supabase/migrations/202610050001_corpersafe_schema.sql) in the SQL editor.
3. Copy `.env.example` to `.env.local` and add the project URL and **anon/public** key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Restart Vite after changing environment variables.

The schema includes profiles, trusted contacts, vehicles, trips, trip contacts, safety check-ins, incidents, incident evidence, emergency alerts, and cases. RLS is enabled. This prototype has no sign-in screen: actions use local demo persistence until an authenticated Supabase user exists. When authenticated, trip and incident inserts are attempted for that user's profile; the profile row must exist. Contact, check-in, emergency, evidence, and responder-status persistence need to be connected as a next integration step. Never put a service-role key in a `VITE_` variable.

## Deploy to Vercel

Import the repository into Vercel with the Vite preset. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the project environment settings if configuring Supabase. Vercel uses `npm run build` and `dist` as the output directory. The app uses client-side routes; configure SPA rewrites to serve `index.html` for nested paths if your Vercel setup does not already do that.

## Demo script (about five minutes)

1. Open the mock NYSC portal page; note the subtle hackathon disclaimer and that **CorperSafe** is its only working navigation item.
2. Click **CorperSafe**, then **Enter Demo Dashboard**. Call out Gideon Adewale as fictional demo data.
3. Open **Verify vehicle**, enter `ABC 123 XY`, and show the Toyota Hiace, white, verified result. Point out that ownership details are never exposed.
4. Open **Start a journey**. Use Oke-Fia Motor Park, Osogbo → Ibadan and Mum. Start the journey and show the simulated contact notification.
5. On **Active journey**, select **I’m safe** and show the recorded check-in. Optionally reset the demo by clearing the `corpersafe-demo-v1` local-storage key to replay this step.
6. Open **Emergency assistance**, select **Vehicle diverted from expected route**, and send an alert. Explain that the contact notification is simulated; FRSC 122 is shown as a reference contact, not a CorperSafe-operated service.
7. Submit an incident with category **Unsafe location**, location `Iwo Road, Ibadan`, and description “The vehicle left the expected route and the driver refused to explain the change.”
8. Open **Responder portal → Incident reports**, find the new `CS-2026-00421` report and change it from **Reported** to **Under Review**.

The admin overview at `/admin` now shows demo member details, system capability status, statistics derived from the shared browser demo store, the Safety Chain, active journey, emergency alerts, incident reports, and a protected case placeholder. Member actions are reflected there as the shared store changes.

## What works and what is simulated

- Working in demo mode: all requested routes, responsive layouts, vehicle success/unverified/unavailable states, trip creation, trusted-contact selection and notification simulation, check-in and missed-check-in demo control, emergency alerts, incident submission and case references, masked contact management, safety guidance, and responder status updates.
- Mocked: vehicle lookup, Corps profile, location, notifications, emergency delivery, admin metrics, route details, and all seed records.
- Deferred: authentication and role enforcement, complete Supabase persistence for all actions, SMS/WhatsApp delivery, evidence storage, real agency/API integrations, live GPS/maps, background monitoring, automated escalation, and production missing-person workflows.

Incident reports are private by design in the schema. The responder screens use fictional records only; they are not a public incident database. The demo UI does not claim to provide real-time tracking or emergency response.
