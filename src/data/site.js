// Single source of truth for all site copy.
// Anything marked TODO is a placeholder — update it once the details are final.

export const event = {
  name: "HACK36",
  edition: "10.0",
  theme: "OVERRIDE",
  tagline: ["Caffeinate", "Collaborate", "Celebrate"],
  host: "MNNIT Allahabad",
  venue: "CSED, MNNIT Allahabad, Prayagraj",
  // TODO: set the real kickoff time (IST). Drives the hero countdown.
  startsAt: "2027-02-20T10:00:00+05:30",
  dateLabel: "FEB 2027", // TODO
  duration: 36,
  registerUrl: "https://unstop.com/", // TODO: this year's Unstop / Devfolio link
  discordUrl: "https://discord.gg/qg9GXmE7",
  email: "hackathon@mnnit.ac.in",
  mapUrl: "https://maps.app.goo.gl/?q=Computer+Science+and+Engineering+Department+MNNIT+Allahabad",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "tracks", label: "Tracks" },
  { id: "timeline", label: "Timeline" },
  { id: "prizes", label: "Prizes" },
  { id: "faq", label: "FAQ" },
];

export const stats = [
  { value: 10, suffix: "", label: "Editions" },
  { value: 1000, suffix: "+", label: "Hackers" },
  { value: 100, suffix: "+", label: "Colleges" },
  { value: 36, suffix: "h", label: "Non-stop" },
];

export const about = {
  title: "Ten years. Zero sleep.",
  lines: ["Build anything.", "Ship it. Demo it. Win it."],
};

// TODO: confirm this year's tracks.
export const tracks = [
  { code: "01", name: "AI / Agents", icon: "chip" },
  { code: "02", name: "Cyber Security", icon: "shield" },
  { code: "03", name: "Web3", icon: "chain" },
  { code: "04", name: "FinTech", icon: "coin" },
  { code: "05", name: "Hardware / IoT", icon: "circuit" },
  { code: "06", name: "Open Innovation", icon: "spark" },
];

// TODO: confirm schedule.
export const timeline = [
  { time: "T-30D", title: "Registrations open" },
  { time: "T-07D", title: "Shortlist out" },
  { time: "00:00", title: "Hacking begins" },
  { time: "12:00", title: "Mentor round" },
  { time: "24:00", title: "Midnight checkpoint" },
  { time: "36:00", title: "Code freeze · Demos" },
];

// Amounts render as an encrypted string until set (null = not revealed yet).
export const prizes = [
  { rank: "02", tier: "Runner-up", amount: null },
  { rank: "01", tier: "Champion", amount: null, featured: true },
  { rank: "03", tier: "Second runner-up", amount: null },
];

export const perks = ["Track prizes", "Internship leads", "Swag for all"];

// Past partners (Hack36 9.0). Swap for this year's list.
export const sponsors = [
  "GeeksforGeeks",
  "Unstop",
  "GitHub",
  "GDG",
  "Coca-Cola",
  "ManageEngine",
  "Cisco thingQbator",
  "Pathway",
  "Auxia",
  "Balsamiq",
  "SybGen",
  "Safexpress",
];

export const faqs = [
  { q: "Does it cost anything?", a: "No. Registration is completely free." },
  { q: "Who can apply?", a: "Any college student who likes solving real problems." },
  { q: "Team size?", a: "2 to 4 members." },
  { q: "How are teams shortlisted?", a: "GitHub profiles and resumes. If 75% of a team looks solid, the team is in." },
  { q: "What can we build?", a: "Web, mobile, hardware — anything that fits a track." },
  { q: "Swag?", a: "Obviously." },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/hack36_/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/hack36" },
  { label: "X", href: "https://twitter.com/hack36mnnit" },
  { label: "GitHub", href: "https://github.com/hack36mnnit" },
  { label: "Discord", href: "https://discord.gg/qg9GXmE7" },
];
