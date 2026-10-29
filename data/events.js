// Shared event data for index.html and files/pages/event-schedule.html.
// Both pages read the live Firestore "events" collection; FALLBACK_EVENTS is
// the standing schedule shown only when the live calendar is unavailable.

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBR_4eRMJnwtL5-6jOC5qh66Jx-8dFBe-4",
  authDomain: "dcfc-data.firebaseapp.com",
  projectId: "dcfc-data",
  storageBucket: "dcfc-data.firebasestorage.app",
  messagingSenderId: "855367837227",
  appId: "1:855367837227:web:ae3784deeaf096c36f2c6e"
};

export const FALLBACK_EVENTS = [
  { title: "Santa Cruzan", parish: "St. Mary Church, National City", address: "426 East 7th Street, National City, CA 91950", time: "4:00 PM procession \u00b7 5:30 PM Mass", detail: "Flores de Mayo offering of flowers, followed by the procession of the sagalas and a reception in the parish hall.", start: "2026-05-30T16:00:00" },
  { title: "Feast of San Lorenzo Ruiz", parish: "Mission Basilica San Diego de Alcal\u00e1", address: "10818 San Diego Mission Road, San Diego, CA 92108", time: "9:15 AM rosary and procession \u00b7 10:00 AM Eucharistic celebration", detail: "Celebrant: Auxiliary Bishop Felipe Pulido. All altar servers are invited to receive a special blessing. Parish delegations are asked to bring their banners.", start: "2026-09-12T09:15:00" },
  { title: "Feast of San Pedro Calungsod", parish: "St. Mary Church, National City", address: "426 East 7th Street, National City, CA 91950", time: "5:00 PM Mass \u00b7 fellowship afterward", detail: "Guest speaker: Fr. Michael Montoya, MJ. A celebration entrusted to the youth of the Diocese, with fellowship in the parish hall following the Mass.", start: "2026-10-24T17:00:00" },
  { title: "Simbang Gabi", parish: "Cathedral of St. Joseph & host parishes", address: "1535 Third Avenue, San Diego, CA 92101", time: "5:30 AM dawn Masses \u00b7 Kick-Off Dec 14, 5:30 PM", detail: "Nine dawn Masses rotating among host parishes, opening with the Kick-Off Mass celebrated by the Bishop.", dateLabel: "December 15 \u2013 23, 2026", start: "2026-12-15T05:30:00", end: "2026-12-23T05:30:00" }
];

export function toDate(v) {
  if (!v) return null;
  if (typeof v.toDate === "function") return v.toDate();
  if (v instanceof Date) return v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDateRange(start, end) {
  if (!start) return "Date to be announced";
  const long = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  if (!end || end.toDateString() === start.toDateString()) return start.toLocaleDateString("en-US", long);
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();
  const a = start.toLocaleDateString("en-US", sameMonth ? { month: "long", day: "numeric" } : { month: "long", day: "numeric", year: sameYear ? undefined : "numeric" });
  const b = end.toLocaleDateString("en-US", { month: sameMonth ? undefined : "long", day: "numeric", year: "numeric" });
  return a + " \u2013 " + b;
}

export function normalizeEvent(id, d) {
  const start = toDate(d.start || d.date || d.startsAt);
  const end = toDate(d.end || d.endsAt);
  return {
    id, start, end,
    title: d.title || "Untitled celebration",
    parish: d.parish || d.location || "",
    address: d.address || "",
    time: d.time || "",
    detail: d.detail || d.notes || "",
    dateLabel: d.dateLabel || "",
    published: d.published !== false,
    date: d.dateLabel || formatDateRange(start, end)
  };
}
