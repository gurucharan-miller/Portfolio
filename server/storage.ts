import { pool, initDb } from './db';
import { PortfolioData } from '../src/types/portfolio';

export const SEED_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: 'GURUCHARAN M',
    shortName: 'Gurucharan',
    title: 'Full-Stack Developer & Embedded Systems Prototyper',
    tagline: 'Computer Science Undergrad · Class of 2028',
    subheading: 'CSE undergraduate at Indra Ganesan College of Engineering. Background in farming and agricultural entrepreneurship, alongside tech.',
    statusBadge: 'AVAILABLE FOR INTERNSHIPS & OPEN SOURCE',
    location: 'Tiruchirappalli, Tamil Nadu, India',
    email: 'charanmguru504@gmail.com',
    phone: '',
    github: 'https://github.com/gurucharan-miller',
    linkedin: 'https://www.linkedin.com/in/guru-charan-m-12aa92368',
    bio: `Gurucharan M — CSE undergrad at Indra Ganesan College of Engineering, Class of 2028. Background in farming and agricultural entrepreneurship, alongside tech.

I build practical, deployable systems spanning full-stack web applications, machine learning tools, and low-cost embedded IoT hardware like portable ECG monitors.`,
    careerObjective: 'To build reliable, open, and efficient software and embedded systems solving real-world challenges through full-stack web development, Python ML workflows, and microcontrollers.',
    interests: [
      'Full-Stack Web Development',
      'Embedded Systems & IoT',
      'Machine Learning & NLP',
      'Microcontroller Programming',
      'Open Source Software',
      'Frontend Engineering'
    ],
    typingRoles: [
      'Full-Stack Developer',
      'Embedded & IoT Builder',
      'Python & ML Developer',
      'CSE Undergrad (Class of 2028)'
    ],
    avatarUrl: '/avatar.svg'
  },
  skills: [
    // Programming Languages
    {
      id: 'python',
      name: 'Python',
      category: 'Languages',
      proficiency: 95,
      iconName: 'Code2',
      description: 'Data analysis, ML models, FastAPI, Django, automation, and backend architectures.',
      featured: true
    },
    {
      id: 'c-plus-plus',
      name: 'C++',
      category: 'Languages',
      proficiency: 88,
      iconName: 'Binary',
      description: 'Object-oriented programming, low-level microcontroller firmware for ESP32 and Arduino.',
      featured: true
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Languages',
      proficiency: 86,
      iconName: 'Cpu',
      description: 'Core data structures, OOP architecture, and Android application development.',
      featured: true
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Languages',
      proficiency: 92,
      iconName: 'FileCode2',
      description: 'Type-safe scalable frontends and backend services with interfaces and generics.',
      featured: true
    },
    {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      category: 'Languages',
      proficiency: 95,
      iconName: 'Code',
      description: 'Modern asynchronous JavaScript, Web APIs, DOM manipulation, and event loops.',
      featured: true
    },

    // Frontend
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      proficiency: 96,
      iconName: 'Atom',
      description: 'Modern component architectures, hooks, state management, and high-performance SPAs.',
      featured: true
    },
    {
      id: 'react-native',
      name: 'React Native',
      category: 'Frontend',
      proficiency: 88,
      iconName: 'Layers',
      description: 'Cross-platform mobile application development with native bridges and BLE streams.',
      featured: true
    },
    {
      id: 'html-css',
      name: 'HTML & CSS',
      category: 'Frontend',
      proficiency: 98,
      iconName: 'Layout',
      description: 'Semantic markup, accessible responsive layouts, flexbox, and modern CSS grid.',
      featured: true
    },
    {
      id: 'tailwindcss',
      name: 'Tailwind CSS',
      category: 'Frontend',
      proficiency: 96,
      iconName: 'Palette',
      description: 'Utility-first modern styling, responsive layouts, design token customization.',
      featured: true
    },
    {
      id: 'vite',
      name: 'Vite',
      category: 'Frontend',
      proficiency: 92,
      iconName: 'Zap',
      description: 'Fast frontend tooling, optimized production bundling, and developer server workflows.',
      featured: true
    },

    // Backend
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      proficiency: 90,
      iconName: 'Server',
      description: 'Asynchronous event-driven server runtime for scalable API services.',
      featured: true
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'Backend',
      proficiency: 92,
      iconName: 'Server',
      description: 'RESTful API routing, middleware chaining, authentication, and microservices.',
      featured: true
    },
    {
      id: 'django',
      name: 'Django',
      category: 'Backend',
      proficiency: 85,
      iconName: 'Layers',
      description: 'High-level Python web framework with robust ORM, authentication, and admin modules.',
      featured: true
    },

    // Database
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Databases',
      proficiency: 92,
      iconName: 'Database',
      description: 'Advanced relational database design, transactions, indexing, and SQL queries.',
      featured: true
    },
    {
      id: 'supabase',
      name: 'Supabase',
      category: 'Databases',
      proficiency: 94,
      iconName: 'HardDrive',
      description: 'PostgreSQL backend-as-a-service with Row Level Security (RLS), real-time sync, and auth.',
      featured: true
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Databases',
      proficiency: 88,
      iconName: 'Boxes',
      description: 'NoSQL document stores, flexible schema models, and aggregation pipelines.',
      featured: true
    },

    // AI / ML
    {
      id: 'gemini-api',
      name: 'Google Gemini API',
      category: 'AI/ML',
      proficiency: 95,
      iconName: 'Sparkles',
      description: 'Multimodal AI generation, structured schema extraction, real-time sustainability audits.',
      featured: true
    },
    {
      id: 'tflite-micro',
      name: 'TensorFlow Lite Micro',
      category: 'AI/ML',
      proficiency: 88,
      iconName: 'Binary',
      description: 'Quantized neural networks deployed on resource-constrained microcontrollers like ESP32.',
      featured: true
    },
    {
      id: 'ai-apps',
      name: 'AI-Powered Applications',
      category: 'AI/ML',
      proficiency: 92,
      iconName: 'BrainCircuit',
      description: 'End-to-end intelligent apps combining LLM reasoning, embeddings, and real-time feeds.',
      featured: true
    },

    // GIS & Visualization / Tools
    {
      id: 'leaflet',
      name: 'Leaflet.js & GIS',
      category: 'Tools',
      proficiency: 90,
      iconName: 'MapPin',
      description: 'Interactive GIS mapping, spatial layers, polygon rendering, and asset geocoding.',
      featured: true
    },
    {
      id: 'recharts',
      name: 'Recharts',
      category: 'Tools',
      proficiency: 92,
      iconName: 'BarChart3',
      description: 'Interactive analytics dashboards, telemetry charting, and real-time data visualizers.',
      featured: true
    },
    {
      id: 'git-github',
      name: 'Git & GitHub',
      category: 'Tools',
      proficiency: 94,
      iconName: 'GitBranch',
      description: 'Version control, branch management, pull requests, and collaborative repository flows.',
      featured: true
    },
    {
      id: 'android-studio',
      name: 'Android Studio',
      category: 'Tools',
      proficiency: 86,
      iconName: 'Terminal',
      description: 'Mobile application building, debugging, emulator testing, and UI profiling.',
      featured: true
    },
    {
      id: 'dev-security',
      name: 'REST APIs & JWT Auth',
      category: 'Tools',
      proficiency: 92,
      iconName: 'ShieldCheck',
      description: 'Secure REST endpoints, JWT authorization, Role-Based Access Control, and Supabase RLS.',
      featured: true
    },

    // Embedded Systems
    {
      id: 'esp32',
      name: 'ESP32 & Arduino',
      category: 'Embedded & IoT',
      proficiency: 94,
      iconName: 'Cpu',
      description: 'Dual-core MCU programming, GPIO control, ADC conversion, and sensor interfacing.',
      featured: true
    },
    {
      id: 'ad8232',
      name: 'AD8232 Biosensors',
      category: 'Embedded & IoT',
      proficiency: 90,
      iconName: 'Activity',
      description: 'Cardiac analog front-end signal acquisition, noise filtering, and waveform processing.',
      featured: true
    },
    {
      id: 'oled-bluetooth',
      name: 'OLED & Bluetooth',
      category: 'Embedded & IoT',
      proficiency: 90,
      iconName: 'Radio',
      description: 'SSD1306 display rendering, Bluetooth Serial streaming, and wireless telemetry.',
      featured: true
    }
  ],
  projects: [
    {
      id: 'rythm-ecg',
      title: 'Rythm ECG Monitor',
      category: 'Embedded & IoT',
      description: 'Portable low-cost ECG monitoring device — ESP32 + AD8232 with a companion cross-platform streaming application.',
      longDescription: 'Rythm ECG Monitor is a portable low-cost ECG monitoring device built with an ESP32 microcontroller and an AD8232 analog front-end biosensor. It captures real-time cardiac signals, applies on-device filtering, calculates heart rate metrics, and streams live telemetry via Bluetooth Low Energy (BLE) to a cross-platform TypeScript/React Native companion application with 60 FPS waveform plotting.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
      techStack: ['TypeScript', 'C++', 'ESP32', 'AD8232', 'React Native', 'BLE', 'MIT License'],
      githubUrl: 'https://github.com/gurucharan-miller/Rythm-ECG-Monitor',
      liveUrl: '',
      featured: true,
      metrics: 'MIT License · Hardware + Mobile',
      highlights: [
        'Real-time cardiac biosignal acquisition with AD8232 sensor',
        'ESP32 dual-core processing and high-frequency ADC sampling',
        'BLE wireless telemetry streaming to companion mobile app',
        'Smooth live waveform rendering and heart rate detection'
      ]
    },
    {
      id: 'auction-management-system',
      title: 'Auction Management System',
      category: 'Full Stack',
      description: 'Full-stack online auction platform featuring live bidding rooms, automated countdowns, and structured catalog management.',
      longDescription: 'Auction Management System is a full-stack web application designed for organizing and conducting online auctions. Built with JavaScript and modern responsive styling, the platform supports real-time bid tracking, dynamic price increments, auction status management, categorized item listings, and transactional safety.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      techStack: ['JavaScript', 'React', 'Tailwind CSS', 'REST APIs', 'Supabase'],
      githubUrl: 'https://github.com/gurucharan-miller/Auction-Management-System',
      liveUrl: 'https://trackr-bee.lovable.app',
      featured: true,
      metrics: 'Live Bidding Platform',
      highlights: [
        'Interactive real-time bidding interface with dynamic increments',
        'Live auction countdowns, catalog filters, and lot tracking',
        'Responsive full-stack architecture with secure data persistence',
        'Optimized component rendering for rapid bid updates'
      ]
    },
    {
      id: 'email-spam-classifier',
      title: 'Email Spam Classifier',
      category: 'AI/ML',
      description: 'Machine learning natural language processing pipeline for classifying emails as spam or legitimate.',
      longDescription: 'Email Spam Classifier is a machine learning tool built in Python to accurately detect spam communications. It implements an NLP preprocessing pipeline including text cleaning, tokenization, stopword removal, and TF-IDF feature extraction, coupled with supervised classification algorithms to achieve high precision screening.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
      techStack: ['Python', 'Scikit-learn', 'NLP', 'Pandas', 'NumPy', 'TF-IDF'],
      githubUrl: 'https://github.com/gurucharan-miller/Email_Spam_Classifier',
      liveUrl: '',
      featured: true,
      metrics: 'NLP Machine Learning Model',
      highlights: [
        'Automated text tokenization, normalization, and stopword removal',
        'TF-IDF vectorization and feature matrix generation',
        'Supervised ML classification pipeline for high-precision detection',
        'Modular batch evaluation and text screening scripts'
      ]
    },
    {
      id: 'titans-health-care',
      title: "Titan's Health Care",
      category: 'Frontend',
      description: 'Healthcare management portal for patient records, medical appointments, and clinical service coordination.',
      longDescription: "Titan's Health Care is a web application designed to streamline patient records management and clinical service navigation. It provides an intuitive, accessible user interface for scheduling appointments, viewing medical service offerings, and tracking patient care records.",
      image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1000&q=80',
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
      githubUrl: 'https://github.com/gurucharan-miller/Titan-s-Health-Care',
      liveUrl: '',
      featured: false,
      metrics: 'Public Repository',
      highlights: [
        'Structured healthcare portal interface and navigation',
        'Patient interaction and appointment booking workflows',
        'Accessible, mobile-responsive layout and styling'
      ]
    },
    {
      id: 'smart-home-dashboard',
      title: 'Smart Home Dashboard',
      category: 'Frontend',
      description: 'Interactive home automation dashboard with telemetry sensor monitors and appliance control toggles.',
      longDescription: 'Smart Home Dashboard is an interactive front-end interface built with modern CSS and JavaScript for home automation. Features responsive telemetry cards for climate and energy metrics, alongside interactive toggle switches for smart lighting and appliances.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
      techStack: ['CSS3', 'HTML5', 'JavaScript', 'DOM Manipulation'],
      githubUrl: 'https://github.com/gurucharan-miller/smart-home-dashboard',
      liveUrl: '',
      featured: false,
      metrics: 'IoT Interface',
      highlights: [
        'Interactive appliance and device control state toggles',
        'Environmental telemetry visual cards (temperature, humidity, energy)',
        'Pure CSS layout system with smooth transitions'
      ]
    },
    {
      id: 'marriage-invitation',
      title: 'Marriage Invitation',
      category: 'Frontend',
      description: 'Digital wedding invitation web page with interactive event timelines, venue details, and animated design.',
      longDescription: 'Marriage Invitation is a custom responsive web application designed as an interactive wedding invitation. It features customized typography, entrance animations, an event schedule timeline, venue map integration, and RSVP information.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Web Animations'],
      githubUrl: 'https://github.com/gurucharan-miller/marriage-invitation',
      liveUrl: '',
      featured: false,
      metrics: 'Interactive Web Page',
      highlights: [
        'Customized aesthetic design with responsive typography and animations',
        'Event schedule, timeline breakdown, and venue navigation',
        'Cross-device compatibility for seamless mobile viewing'
      ]
    }
  ],
  experience: [
    {
      id: 'cybernaut-edtech',
      title: 'Python Project Intern',
      company: 'Cybernaut EdTech',
      location: 'Remote · India',
      type: 'Internship',
      duration: 'Active / Ongoing',
      period: 'May 2026 – Present',
      description: 'Working on Python-based projects, contributing to feature development, and collaborative problem-solving within a distributed remote team environment.',
      responsibilities: [
        'Working on Python-based projects and application architecture.',
        'Contributing to feature development and software engineering tasks.',
        'Engaging in collaborative problem-solving within a remote team environment.'
      ],
      technologies: ['Python', 'Problem Solving', 'Git', 'Software Engineering', 'Feature Development'],
      achievements: [
        'Active contributor to core Python application modules and team technical deliverables.'
      ]
    },
    {
      id: 'isquare-data-systems',
      title: 'Application Developer — Internship',
      company: 'iSquare Data Systems (P) Ltd',
      location: 'Tiruchirappalli, India',
      type: 'Internship',
      duration: '6 Months',
      period: 'Dec 2025 – May 2026',
      description: 'Built and tested mobile applications, worked on UI design, feature implementation, and bug fixing across the complete mobile application development lifecycle.',
      responsibilities: [
        'Built and tested robust mobile application features and user interfaces.',
        'Worked on UI design and frontend client-side feature implementation.',
        'Performed systematic bug fixing, profiling, and performance diagnostics.',
        'Gained hands-on professional experience with Android Studio.',
        'Worked end-to-end through the complete mobile application development lifecycle.'
      ],
      technologies: ['Android Studio', 'Mobile App Development', 'UI Design', 'Java', 'Kotlin', 'Bug Fixing'],
      achievements: [
        'Delivered feature implementations and UI components across mobile application release cycles.'
      ]
    },
    {
      id: 'astonish-infotech',
      title: 'Student Intern — Internship',
      company: 'Astonish InfoTech – India',
      location: 'Tiruchirappalli, India',
      type: 'Internship',
      duration: '7 Months',
      period: 'Jul 2025 – Jan 2026',
      description: 'Worked with React and MongoDB to build dynamic web applications with responsive component-based designs and API integrations.',
      responsibilities: [
        'Worked with React and MongoDB to architect dynamic full-stack web applications.',
        'Built responsive, component-based user interfaces with modular state management.',
        'Engineered database schemas and seamless RESTful API integration layers.',
        'Developed practical, industry-standard full-stack web development skills.'
      ],
      technologies: ['React', 'MongoDB', 'JavaScript', 'REST APIs', 'Component Design', 'State Management'],
      achievements: [
        'Successfully built and deployed dynamic web applications with full database and API connectivity.'
      ]
    }
  ],
  education: [
    {
      id: 'igce-btech',
      degree: 'Bachelor of Engineering — Computer Science',
      institution: 'Indra Ganesan College of Engineering',
      location: 'Tiruchirappalli, Tamil Nadu, India',
      period: 'Aug 2024 – Dec 2028',
      score: 'Grade: A+',
      details: 'Computer Science Engineering curriculum focusing on full-stack development, AI, sustainability systems, database architectures, and embedded IoT development.',
      highlights: [
        'Consistently maintained Grade A+ academic standing across technical coursework',
        'Expected Graduation: 2028',
        'Built high-impact sustainability systems (Enviora) and national hackathon hardware (RYTHM)',
        'Core focus: React, Node.js, Python, Supabase, PostgreSQL, AI & IoT systems'
      ]
    }
  ],
  certificates: [
    {
      id: 'cybernaut-tech-trio',
      title: 'Tech Trio Courses — C++, Java & Python',
      issuer: 'Cybernaut EdTech',
      date: '2026',
      credentialId: 'CYBERNAUT-TECH-TRIO-2026',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      skills: ['C++', 'Java', 'Python', 'OOP', 'Data Structures'],
      verifyUrl: 'https://cybernaut.co.in/'
    }
  ],
  githubStats: {
    totalCommits: 520,
    pullRequests: 42,
    starsEarned: 135,
    contributionsThisYear: 410,
    currentStreak: 28
  }
};

export async function getPortfolioData(): Promise<PortfolioData> {
  await initDb();

  const result = await pool.query('SELECT data FROM portfolio_content WHERE id = 1');
  if (result.rows.length > 0) {
    return result.rows[0].data as PortfolioData;
  }

  // No row yet: seed the database
  await pool.query(
    'INSERT INTO portfolio_content (id, data) VALUES (1, $1) ON CONFLICT (id) DO NOTHING',
    [JSON.stringify(SEED_PORTFOLIO_DATA)]
  );
  return SEED_PORTFOLIO_DATA;
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  await initDb();

  try {
    await pool.query(
      `INSERT INTO portfolio_content (id, data, updated_at)
       VALUES (1, $1, now())
       ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()`,
      [JSON.stringify(data)]
    );
    return true;
  } catch (e) {
    console.error('Error saving portfolio data:', e);
    return false;
  }
}

export async function resetPortfolioData(): Promise<PortfolioData> {
  await initDb();

  await pool.query(
    `INSERT INTO portfolio_content (id, data, updated_at)
     VALUES (1, $1, now())
     ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()`,
    [JSON.stringify(SEED_PORTFOLIO_DATA)]
  );
  return SEED_PORTFOLIO_DATA;
}
