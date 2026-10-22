// Optional fields: date, repository, demo, image, imageAlt, outcome, sections.
// Keep uncertain details null. All descriptions are based on Edwin's intake.
export const projects = [
  {
    slug: 'q-site', title: 'Q-Site', subtitle: 'Quantum thinking. Real energy challenges.',
    fullTitle: 'Hybrid Quantum Resource Allocation for AI-Loaded Microgrids',
    category: 'Quantum computing', featured: true, visual: 'quantum', year: '2026', date: null,
    status: 'Global Industry Challenge finalist', role: 'Point of Contact · Qiskit integration & QAOA execution',
    summary: 'Exploring where to place battery storage to improve grid voltage stability, using classical and quantum optimisation.',
    stack: ['Python', 'Qiskit', 'QAOA', 'IBM Quantum', 'qBraid', 'pandapower', 'NetworkX', 'NumPy', 'SciPy'],
    repository: 'https://github.com/edwingeorgeshaji/Q-Site', demo: null, image: null,
    outcome: 'Finalist · Global Industry Challenge 2026',
    sections: [
      { title: 'The question', body: ['How can battery energy storage be placed to help a power grid remain stable when transmission lines fail? Q-Site explores that question for microgrids carrying AI-related loads.'] },
      { title: 'My contribution', body: ['As the team’s Point of Contact, I was responsible for integrating Qiskit and executing the Quantum Approximate Optimisation Algorithm (QAOA). The project compared classical search, simulator QAOA, and execution on real IBM Quantum hardware.'] },
      { title: 'What we found', body: ['The classical, simulator, and hardware approaches selected Bus 9 and Bus 10. In an AC power-flow simulation using pandapower across 15 contingency scenarios, unsafe-voltage bus incidents fell from 30 to 27: a 10% reduction.', 'That improvement was measured in simulation. IBM Quantum hardware was used for the battery-placement optimisation; the 10% improvement was not independently measured on hardware.'], metric: { value: '30 → 27', label: 'Unsafe-voltage bus incidents in simulation', note: '15 contingency scenarios · pandapower AC power flow' } },
      { title: 'The challenge', body: ['Our team reached Phase 3, the final stage of the Global Industry Challenge 2026, under the U.S. Department of Energy Office of Technology Commercialization. We finished as finalists.'] }
    ]
  },
  {
    slug: 'paperiq', title: 'PaperIQ', subtitle: 'A clearer path through research.',
    fullTitle: 'AI-Powered Research Assistant', category: 'Artificial intelligence', featured: true,
    visual: 'research', year: null, date: null, status: 'Completed web application',
    role: 'Team Techies · Team contributor',
    summary: 'A browser-based assistant for discovering papers, comparing research, and finding useful insights with AI.',
    stack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'OpenAlex API', 'Gemini AI', 'Chart.js', 'LocalStorage'],
    repository: 'https://github.com/Infosys-PaperIQ-Team-Techies/Infosys-PaperIQ-AI-Research-Assistant', demo: null, image: null,
    outcome: 'Infosys Springboard · Virtual Internship 6.0',
    sections: [
      { title: 'Research, brought together', body: ['Academic research often involves moving between discovery tools, documents, and notes. PaperIQ brings paper discovery, comparison, and document analysis into one web application.'] },
      { title: 'What we built', body: ['Working with Team Techies during Infosys Springboard Virtual Internship 6.0, I contributed to a working research assistant featuring academic paper discovery, AI-powered comparisons, document uploads, analysis, and generated insights.'] },
      { title: 'How it works', body: ['The application combines the OpenAlex API for academic discovery with Gemini AI for analysis. Its browser interface uses HTML, Tailwind CSS, and JavaScript, with Chart.js for visualisation and LocalStorage for browser persistence.'] }
    ]
  },
  {
    slug: 'adaptive-lidar', title: 'Adaptive LiDAR Mapping', subtitle: 'Detail where it matters.',
    fullTitle: 'Adaptive Variable Resolution 2.5D LiDAR Mapping', category: 'Autonomous systems',
    featured: true, visual: 'lidar', year: '2026', date: null,
    status: 'College-level selection winner', role: 'Team Gol D · Team lead & animated prototype developer',
    summary: 'An animated prototype exploring terrain-aware navigation through adaptive resolution, elevation, and obstacle detection.',
    stack: ['LiDAR mapping concept', 'Terrain analysis', 'Prototype development'],
    repository: null, demo: 'https://youtu.be/WWgDjudSdd4', demoLabel: 'Watch prototype', image: null,
    outcome: 'SIH 2026 · DRDO challenge',
    sections: [
      { title: 'Detail with purpose', body: ['Autonomous navigation needs a useful representation of its surroundings. Our proposed approach gives nearby terrain higher resolution and distant terrain lower resolution, while retaining elevation and semantic information.'] },
      { title: 'My contribution', body: ['I led Team Gol D and personally developed an animated prototype demonstrating adaptive-resolution mapping, terrain analysis, and static and dynamic obstacle detection. The animation communicates our proposed approach.'] },
      { title: 'Where it stands', body: ['Our team won the college-level selection for SIH 2026 and submitted the project to the next level for DRDO’s challenge. At the time of this update, the next-stage results are awaited. The deliverable presented here is an animated prototype.'] }
    ]
  },
  {
    slug: 'hybrid-lpg', title: 'Smarter cooking, by design.', subtitle: 'A hybrid approach to everyday energy.',
    fullTitle: 'Smart Hybrid LPG Optimization and Automation System', category: 'Hardware & IoT',
    featured: true, visual: 'energy', year: '2026', date: null, status: '1st place · Innovare Ideathon',
    role: 'Team prototype project',
    summary: 'A working prototype exploring LPG optimisation, automation, and hybrid heating for better fuel management.',
    stack: ['Embedded systems', 'Sensors', 'IoT', 'Hybrid heating'],
    repository: null, demo: null, image: null, outcome: '1st place · Innovare Ideathon 2026',
    sections: [
      { title: 'An everyday energy problem', body: ['Our project explores how sensing, automation, and hybrid LPG-electric heating can support more efficient cooking and fuel management.'] },
      { title: 'From idea to prototype', body: ['Alongside Donamol Joseph, Karthik Raj, and Junia Alex, I developed and presented a functional prototype at Innovare Ideathon 2026.'] },
      { title: 'The result', body: ['Our team secured first place at the event, organised by IEEE IAS SBC RIT in collaboration with the Institution’s Innovation Council (IIC).'] }
    ]
  },
  {
    slug: 'aeroshield', title: 'AeroShield', fullTitle: 'Air Quality Index Detector',
    category: 'Web development', featured: false, year: '2025', date: null,
    status: 'NASA Space Apps team project', role: 'Team contributor',
    summary: 'Air-quality information explored through interactive maps and data visualisations.',
    stack: ['Node.js', 'Express.js', 'JavaScript', 'Chart.js', 'OpenWeatherMap API', 'Leaflet.js'],
    repository: 'https://github.com/edwingeorgeshaji/Aerosheild---AQI-Detector', demo: null, image: null,
    sections: [{ title: 'The project', body: ['Developed as a team project for NASA Space Apps 2025, AeroShield explores how maps and visualisations can make air-quality information easier to understand. The application combines OpenWeatherMap data with Leaflet maps and Chart.js visualisations.'] }]
  },
  {
    slug: 'smartstockanalyzer', title: 'SmartStockAnalyzer', fullTitle: 'DBMS Miniproject',
    category: 'Database systems', featured: false, year: null, date: null,
    status: 'Completed', role: 'Team project',
    summary: 'A completed team miniproject developed as part of database management systems coursework.',
    stack: ['Python', 'HTML', 'CSS', 'JavaScript'], repository: null, demo: null, image: null,
    sections: [{ title: 'The project', body: ['SmartStockAnalyzer is a completed DBMS miniproject developed as a team. The project combines a Python backend with a web interface built using HTML, CSS, and JavaScript.'] }]
  },
  {
    slug: 'guido-academic-planner', title: 'Guido Academic Planner', fullTitle: 'A Space for Student Planning',
    category: 'Web development', featured: false, year: null, date: null,
    status: 'Personal project', role: 'Independent developer',
    summary: 'A student planning interface for academic tasks, deadlines, reminders, and study schedules.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    repository: 'https://github.com/edwingeorgeshaji/student-activity-tracker', demo: null, image: null,
    sections: [{ title: 'Making room for focus', body: ['I independently developed Guido Academic Planner to explore a more organised approach to student life. The project brings academic tasks, deadlines, reminders, and study schedules into a web interface.'] }]
  },
  {
    slug: 'guido-reminder', title: 'Guido Task Reminder', fullTitle: 'Tasks, Reminders & a Little Structure',
    category: 'Python', featured: false, year: null, date: null,
    status: 'Personal project', role: 'Independent developer',
    summary: 'An independently developed Python task and reminder application with JSON-based persistence.',
    stack: ['Python', 'JSON'], repository: 'https://github.com/edwingeorgeshaji/Firstman', demo: null, image: null,
    sections: [{ title: 'An early building block', body: ['Guido Task Reminder is a personal Python project exploring task management and reminders. JSON-based persistence allows task information to be stored between sessions.'] }]
  },
  {
    slug: 'inflation-analyzer', title: 'Inflation Analyzer', fullTitle: 'Exploring India’s Consumer Price Index',
    category: 'Machine learning', featured: false, year: null, date: null,
    status: 'Core implementation completed', role: 'Forecasting, preprocessing & dashboard development',
    summary: 'A forecasting model and dashboard for exploring rural and urban CPI trends in India.',
    stack: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'Plotly', 'Jupyter'],
    repository: 'https://github.com/edwingeorgeshaji/Inflation-Analyzer', demo: null, image: null,
    sections: [{ title: 'Patterns in the cost of living', body: ['For Milestone 1 of Infosys Springboard Virtual Internship 6.0, I developed a forecasting model, data preprocessing pipeline, and interactive dashboard to explore India’s rural and urban Consumer Price Index.', 'The project uses TensorFlow and Keras for modelling, with a Streamlit interface and Plotly visualisations for historical trends and forecasts.'] }]
  },
  {
    slug: 'technoblade-quiz', title: 'Technoblade Trivia', fullTitle: 'A Python Console Quiz',
    category: 'Python', featured: false, year: null, date: null,
    status: 'Completed', role: 'Independent developer',
    summary: 'A console trivia game with randomised questions, instant feedback, and score tracking.',
    stack: ['Python'], repository: 'https://github.com/edwingeorgeshaji/TECHNOBLADE', demo: null, image: null,
    sections: [{ title: 'Building through play', body: ['I independently developed this Python quiz game celebrating Technoblade. It includes randomised multiple-choice questions, answer validation, score tracking, immediate feedback, and personalised end-game messages.'] }]
  }
];
