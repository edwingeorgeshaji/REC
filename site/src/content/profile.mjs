// Edit content here, then run `npm run build`. No component edits required.
export const profile = {
  name: 'Edwin George Shaji',
  description: 'Computer Science and Engineering student exploring software, artificial intelligence, and quantum computing.',
  siteUrl: 'https://edwin-george-shaji.cozy-larch-9109.chatgpt.site',
  email: 'edwingeorgeshajipadiyanickal@gmail.com',
  location: 'Calicut, Keralam, India',
  languages: ['English', 'Malayalam'],
  github: 'https://github.com/edwingeorgeshaji',
  linkedin: 'https://www.linkedin.com/in/edwingeorgeshaji',
  gravatar: 'https://gravatar.com/edwingeorgeshaji',
  resume: '/assets/edwin-george-shaji-resume.pdf',
  // Add the portrait path after Edwin supplies the image.
  portrait: null,
  // User-supplied Parceh font, retained locally and served from this site.
  heroFont: '/fonts/parceh.otf',
  introduction: 'Curiosity is where it starts.',
  about: [
    'I’m Edwin, a Computer Science and Engineering student at Amal Jyothi College of Engineering. I’m drawn to the places where software, artificial intelligence, and quantum computing meet.',
    'Technology has held my attention since childhood. Today, that curiosity takes the form of web applications, experiments with quantum algorithms, and learning how to turn an idea into something that works.',
    'I’m working towards a career in software development, with a particular interest in quantum software. Along the way, I help organise student communities and bring people together to learn and build.'
  ],
  skills: [
    { name: 'Development', items: ['Python', 'Java', 'C', 'JavaScript', 'HTML & CSS', 'Node.js', 'Firebase'] },
    { name: 'Quantum exploration', items: ['Qiskit', 'QAOA', 'IBM Quantum', 'PennyLane · learning'] },
    { name: 'Tools & workflow', items: ['Git & GitHub', 'Linux', 'Figma', 'n8n', 'Claude Code', 'Codex CLI', 'Antigravity'] }
  ],
  education: [
    { title: 'B.Tech, Computer Science and Engineering', school: 'Amal Jyothi College of Engineering', date: 'Sep 2024 — May 2028', detail: 'Expected graduation · 2028', highlight: '8.55 / 10', note: 'CGPA through Semester 4' },
    { title: 'Higher Secondary & SSLC', school: 'St. Joseph’s Boys’ Higher Secondary School, Kozhikode', date: '2024 / 2022', detail: 'Higher Secondary · 2024   /   SSLC · 2022' }
  ],
  // Titles supplied in the résumé. Add issuer, date, URL, and asset when supplied.
  // Records with published: false are omitted automatically.
  certificates: [
    { title: 'Getting Started with Artificial Intelligence', type: 'Artificial intelligence', issuer: null, date: null, url: null, published: true },
    { title: 'AI Fluency for Students', type: 'Artificial intelligence', issuer: null, date: null, url: null, published: true },
    { title: 'Freedom With AI Masterclass', type: 'Applied learning', issuer: null, date: null, url: null, published: true },
    { title: 'NASA Space Apps Challenge 2025', type: 'Participation', issuer: null, date: '2025', url: null, published: true }
  ]
};

export const experience = [
  {
    organisation: 'NeST Technologies', kind: 'Internship',
    roles: [{ title: 'Data Science Summer Intern', date: 'May 2026', current: false }],
    description: 'Explored data science through practical work in Jupyter notebooks during an on-site summer internship in Aluva, Kerala.',
    tags: ['Data science', 'Python', 'Jupyter']
  },
  {
    organisation: 'Infosys Springboard', kind: 'Internship',
    roles: [{ title: 'Student Intern · Virtual Internship 6.0', date: null, current: false }],
    description: 'Worked with Team Techies to develop PaperIQ, an AI-powered research assistant. Earlier milestone work included a CPI forecasting model and interactive dashboard.',
    tags: ['Artificial intelligence', 'Team development', 'Research tools']
  },
  {
    organisation: 'ACM AJCE Student Chapter', kind: 'Leadership',
    roles: [
      { title: 'Secretary', date: 'Jul 2026 — Present', current: true },
      { title: 'Marketing Co-Lead', date: 'Mar 2025 — Jul 2026', current: false }
    ],
    description: 'Help coordinate the executive committee and organise opportunities for students to learn, collaborate, and connect.',
    highlights: ['Game development workshop for around 70 school students', 'Flutter workshop with around 50 attendees', 'AiTHRA tournaments: around 35 Valorant teams in 2025 and 64 Mini Militia teams in 2026'],
    tags: ['Event coordination', 'Communication', 'Student communities']
  },
  {
    organisation: 'Amal Jyothi College of Engineering', kind: 'Leadership',
    roles: [
      { title: 'Placement Campus Ambassador', date: 'Jul 2026 — Present', current: true },
      { title: 'Placement Class Representative', date: 'Jul 2025 — Jun 2026', current: false }
    ],
    description: 'Support campus placement activities, coordinate with placement officers, and help classmates prepare for opportunities. Conducted a placement session for my class.',
    tags: ['Student coordination', 'Campus recruitment']
  },
  {
    organisation: 'Google Gemini campus initiative', kind: 'Community',
    roles: [{ title: 'Gemini Campus Ambassador', date: 'Apr 2026 — Present', current: true }],
    description: 'Contribute to student outreach, Gemini AI awareness campaigns, workshops, and community engagement. The campus initiative is operated through Communique Marketing Solutions Pvt Ltd.',
    tags: ['AI awareness', 'Workshops', 'Outreach']
  },
  {
    organisation: 'GDG on Campus AJCE', kind: 'Community',
    roles: [{ title: 'Marketing Team Member', date: 'Sep 2025 — Present', current: true }],
    description: 'Help organise and coordinate student events, including Google Solution Challenge activities with around 130 attendees and UXplore, a joint ACM/GDG UI/UX hackathon with around 60 participants.',
    tags: ['Event promotion', 'Community', 'Collaboration']
  }
];
