// Verified from Farhan Alwahid's CV (Farhan_Alwahid_CV_Full_Stack_Engineer.pdf):
// - Location: Jakarta, Indonesia.
// - Ternak Klip (PT Media Klip Nusantara): Full Stack Engineer, Jul 2026 to Present.
// - PT Optimal Untuk Negeri (cbtoptimal.com): Software Engineer, Aug 2025 to Jul 2026.
//   Supported 8.4K+ users, 960K+ question interactions, 21.4K+ assessments, 3.5K+ paid enrollments.
// - PT Formulatrix Indonesia: Software Engineer Intern, Jan 2025 to Mar 2025.
// - PT Pupuk Indonesia (Persero): Full Stack Engineer Intern, Aug 2023 to Oct 2023.
// - Computer Science Student Association (HMIK): Head of Project Management, Jan 2023 to Nov 2023.
// - Thesis: Graduation prediction system, 2024 (Bachelor of Computer Science, Pertamina University, 2020 to 2024).
// - Shopmate: Personal project, 2025. Storefront branded Shoppy on the live screen; case uses the repo name Shopmate.
//
// Conventions: every visible string lives in this file. Sentence case, real apostrophes, no em or en dashes.
// `focus` (0 to 1) is the x position of the 9:16 crop centre on the cover. Timecodes are scroll pixels at 30 fps.

export type Layer = 'screen' | 'server' | 'data' | 'ship';

export const layerOrder: Layer[] = ['screen', 'server', 'data', 'ship'];

export const layerLabels: Record<Layer, string> = {
  screen: 'Screen',
  server: 'Server',
  data: 'Data',
  ship: 'Ship',
};

// A track: the id sits in a chip (V1, A1), the name beside it.
export type Track = { id: string; name: string };

export type ImageMedia = {
  kind: 'image';
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

// Typographic frame built from real source text (README tree, handlers, config).
export type CodeMedia = {
  kind: 'code';
  title: string;
  code: string;
  caption?: string;
  alt: string;
};

export type Media = ImageMedia | CodeMedia;

export type Project = {
  slug: string;
  number: string; // '01' to '05'
  title: string;
  line: string; // one line for the index row
  summary: string; // case page lede and meta description
  year: string;
  role: string;
  layers: Layer[];
  tracks: Partial<Record<Layer, string>>; // label for each used lane (keys match layers)
  stack: string[];
  links: { label: string; href: string }[];
  cover: Media; // hero media and the work clip
  focus: number; // 0 to 1: x of the 9:16 crop centre on the cover
  context: string;
  idea: string;
  craft: { text: string }[]; // checks, one line each
  frames: Media[]; // 1 to 3 craft frames
  outcome: string;
  placeholderNotes?: string[]; // fields the owner should verify
};

export type Experience = {
  company: string;
  title: string;
  current?: boolean;
  description: string;
  tech: string[];
  period?: string; // add when known
};

export type StackBlock = { layer: Layer; items: string[] };

// Agile is cut into sprints, Waterfall into long phases: the same track length, two edits.
export type MethodCut =
  | { kind: 'sprints'; count: 8; label: 'Sprint' }
  | { kind: 'phases'; phases: ['Requirements', 'Design', 'Build', 'Test'] };

export type Method = {
  name: 'Agile' | 'Waterfall';
  title: string;
  body: string;
  image: ImageMedia;
  cut: MethodCut;
};

export type Social = { label: string; href: string };

export type Site = {
  name: string;
  role: string;
  url: string;
  description: string;
  email: string;
  location: string;
  socials: Social[];
};

export const site: Site = {
  name: 'Farhan Alwahid',
  role: 'Full stack software engineer',
  url: 'https://farhanalwahid-portofolio.vercel.app',
  description:
    'Farhan Alwahid, full stack software engineer at Ternak Klip in Jakarta, Indonesia. He builds web products end to end with React, Next.js, Go and PostgreSQL.',
  email: 'farhanalwahid10@gmail.com',
  location: 'Jakarta, Indonesia',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Leonfarhan' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/farhan-alwahid/' },
  ],
};

export type NavItem = { label: string; href: string; id: string };

export const nav: NavItem[] = [
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
];

export const header: { timecodeLabel: string; skipLink: string } = {
  timecodeLabel: 'Playhead',
  skipLink: 'Skip to content',
};

export const loader: { label: string } = {
  label: 'Importing',
};

export const hero: {
  track: Track;
  stack: string;
  overlays: { topLeft: string; topRight: string; bottomRight: string };
  name: string;
  caption: string;
  intro: string;
  scrollCue: string;
} = {
  track: { id: 'V1', name: 'Source' },
  stack: 'React, Next.js, TypeScript, Go',
  overlays: {
    topLeft: 'Full stack engineer, Ternak Klip',
    topRight: 'Jakarta, Indonesia',
    bottomRight: '9:16',
  },
  name: 'Farhan Alwahid',
  caption: 'I build web products end to end',
  intro:
    'The React screen, the Go server under it and the deploy. I’ve shipped all three for creator campaigns, exam prep and online stores.',
  scrollCue: 'Scroll to play',
};

export const now: {
  track: Track;
  text: string;
  link: { label: string; href: string };
} = {
  track: { id: 'REC', name: 'Now' },
  text: 'Full stack engineer at Ternak Klip (PT Media Klip Nusantara), the creator-campaign platform paying clippers per view across TikTok, YouTube Shorts and Instagram Reels. I build transactional campaign and payout workflows with Next.js, Go and PostgreSQL, double-entry financial accounting with NestJS, and virtual account payouts through Xendit.',
  link: { label: 'ternakklip.com', href: 'https://ternakklip.com' },
};

export const workSection: {
  track: Track;
  prompt: string;
  clipLabel: string;
  cta: string;
} = {
  track: { id: 'V1', name: 'Work' },
  prompt: 'Five clips from the long take. The tracks under each one show what I built myself.',
  clipLabel: 'Clip {n} of {total}',
  cta: 'Open clip',
};

export const projects: Project[] = [
  {
    slug: 'cbt-optimal',
    number: '01',
    title: 'CBT Optimal',
    line: 'Exam practice for nurses and midwives preparing for UKOM',
    summary:
      'An exam practice platform for Indonesian nurses and midwives preparing for UKOM, the national competency exam. Supported 8.4K+ users and 960K+ question interactions.',
    year: '2025 to 2026',
    role: 'Software engineer at PT Optimal Untuk Negeri.',
    layers: ['screen', 'server', 'data', 'ship'],
    tracks: { screen: 'React', server: 'Go (Fiber), Mayar', data: 'PostgreSQL', ship: 'Docker, Nginx, DigitalOcean' },
    stack: ['React', 'Go (Fiber)', 'PostgreSQL', 'Docker', 'Nginx', 'DigitalOcean', 'Mayar.id', 'Groq'],
    links: [{ label: 'Visit site', href: 'https://cbtoptimal.com' }],
    cover: {
      kind: 'image',
      src: '/work/cbt-optimal/cover.jpg',
      width: 1600,
      height: 1000,
      alt: 'Hero of the CBT Optimal landing page, with the headline, three team portraits and a start button.',
      caption: 'The live landing page: headline, team portraits and the start button.',
    },
    focus: 0.3,
    context:
      'UKOM decides whether a nursing or midwifery graduate can register to practise. The real exam is computer based and timed, so practising on paper or in a generic quiz app doesn’t feel like the day itself.',
    idea:
      'Make practice behave like the real test: the same timed flow and a score the moment time runs out. Then turn the result into structured study, with AI result reports powered by Groq and automated grading.',
    craft: [
      { text: 'Exam screen in React with a countdown timer and scoring' },
      { text: 'Go (Fiber) API for questions, attempts and automated grading' },
      { text: 'AI evaluation reports with Groq analytics' },
      { text: 'Payments and subscriptions through Mayar.id' },
      { text: 'Dockerized services on DigitalOcean with managed PostgreSQL and CI/CD' },
    ],
    frames: [
      {
        kind: 'image',
        src: '/work/cbt-optimal/frame-1.jpg',
        width: 1600,
        height: 1000,
        alt: 'Features section of the CBT Optimal landing page: five cards on a pale background',
        caption: 'The features section: five cards, including AI evaluation after a try out and the UKOM question bank.',
      },
      {
        kind: 'image',
        src: '/work/cbt-optimal/frame-2.jpg',
        width: 1600,
        height: 1000,
        alt: 'Learning flow section of the CBT Optimal landing page: four numbered steps above a purple stats band',
        caption: 'The four-step learning flow: create an account, start a try out, study the results, strengthen weak areas.',
      },
    ],
    outcome:
      'Live at cbtoptimal.com. Supported 8.4K+ users, 960K+ question interactions, 21.4K+ assessments, and 3.5K+ paid enrollments.',
  },
  {
    slug: 'shopmate',
    number: '02',
    title: 'Shopmate',
    line: 'Online store with Stripe checkout, front to back',
    summary:
      'A full e-commerce build: a Next.js storefront, a NestJS API, PostgreSQL on AWS and Stripe for payment.',
    year: '2025',
    role: 'Personal project. Design, front end, back end and deploy.',
    layers: ['screen', 'server', 'data', 'ship'],
    tracks: { screen: 'Next.js, Tailwind CSS', server: 'NestJS, Stripe', data: 'PostgreSQL on AWS Aurora', ship: 'Docker, Elastic Beanstalk, Vercel' },
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'NestJS',
      'PostgreSQL (AWS Aurora)',
      'Stripe',
      'Docker',
      'AWS Elastic Beanstalk',
    ],
    links: [
      { label: 'Visit site', href: 'https://shopmate-ui.vercel.app' },
      { label: 'Front end source', href: 'https://github.com/Leonfarhan/shopmate-ui' },
      { label: 'API source', href: 'https://github.com/Leonfarhan/shopmate-server' },
    ],
    cover: {
      kind: 'code',
      title: 'Two repositories',
      code: [
        'shopmate-ui',
        '  Next.js, TypeScript, Tailwind CSS',
        '  storefront, cart, Stripe checkout',
        '  deployed on Vercel',
        'shopmate-server',
        '  NestJS, TypeScript',
        '  PostgreSQL on AWS Aurora',
        '  Docker on AWS Elastic Beanstalk',
      ].join('\n'),
      alt: 'The two Shopmate repositories and what each one runs',
    },
    focus: 0.22,
    context:
      'A store looks simple until it has to take money. Accounts, a cart that survives a refresh, payment confirmation and a server that runs somewhere other than a laptop are where the work is.',
    idea:
      'Split the store in two: a storefront and an API in separate repositories, so each side can be built, deployed and scaled on its own. Stripe handles the card; the API only records what Stripe confirms.',
    craft: [
      { text: 'Next.js and Tailwind CSS storefront' },
      { text: 'NestJS API in TypeScript' },
      { text: 'PostgreSQL on AWS Aurora' },
      { text: 'Stripe payments' },
      { text: 'Docker images on AWS Elastic Beanstalk' },
    ],
    frames: [
      {
        kind: 'image',
        src: '/work/shopmate/cover.jpg',
        width: 1600,
        height: 1000,
        alt: 'Dark login screen of the Shoppy storefront, with email and password fields and a Login button',
        caption: 'The live storefront’s sign-in screen, branded Shoppy.',
      },
    ],
    outcome:
      'The storefront is live at shopmate-ui.vercel.app. Both repositories are public on GitHub.',
  },
  {
    slug: 'go-clean-architecture',
    number: '03',
    title: 'Go Clean Architecture',
    line: 'Auth API in Go where the core imports nothing',
    summary:
      'An authentication API in Go, built to the clean architecture rule: the domain at the center depends on nothing outside it.',
    year: '2026',
    role: 'Personal project.',
    layers: ['server', 'data'],
    tracks: { server: 'Go, Gin, JWT', data: 'PostgreSQL, sqlx' },
    stack: ['Go', 'Gin', 'PostgreSQL', 'sqlx', 'JWT', 'bcrypt'],
    links: [{ label: 'Source', href: 'https://github.com/Leonfarhan/golang-clean-architecture' }],
    cover: {
      kind: 'code',
      title: 'Project structure',
      code: [
        'cmd/api/main.go',
        'internal/',
        '  domain/      user.go  errors.go',
        '  usecase/     auth.go  user.go',
        '               auth_test.go',
        '  adapter/',
        '    handler/   auth.go  user.go',
        '               health.go',
        '               middleware.go',
        '               ratelimit.go',
        '    postgres/  connection.go',
        '               user_repository.go',
        '               transaction.go',
        '    security/  password.go  token.go',
        '  infrastructure/',
        '    config/    config.go',
        '    logger/    logger.go',
        'migrations/',
        '  000001_create_users_table.up.sql',
        'Makefile  go.mod',
      ].join('\n'),
      alt: 'Folder tree of the Go service: cmd, the internal layers, migrations and the Makefile.',
      caption: 'Four layers inside internal/, with migrations and the Makefile beside them.',
    },
    focus: 0.25,
    context:
      'An auth service is small, but it touches every layer: HTTP, passwords, tokens and the database. That makes it a good place to prove an architecture.',
    idea:
      'Four layers, one direction of dependency. Domain holds the user and its errors. Use cases hold sign up, log in and profile. Adapters translate HTTP, PostgreSQL, bcrypt and JWT. Infrastructure carries config and logging. Swapping Gin or Postgres touches one folder.',
    craft: [
      { text: 'Rate limiting at 10 requests per second, bursts of 20' },
      { text: '/health and /ready endpoints; /ready checks the database' },
      { text: 'Transactions through a helper in the Postgres adapter' },
      { text: 'Graceful shutdown of the server and the database' },
      { text: 'Tests for use cases and handlers' },
    ],
    frames: [
      {
        kind: 'code',
        title: 'Endpoints',
        code: [
          'GET   /health     basic health check',
          'GET   /ready      readiness, includes the database',
          'POST  /register   create a user',
          'POST  /login      returns a JWT',
          'GET   /profile    current user, Bearer token',
        ].join('\n'),
        alt: 'List of the five API endpoints with their HTTP method, path and purpose.',
        caption: 'Five routes: two health checks, register and login, and a profile route that takes a Bearer token.',
      },
      {
        kind: 'code',
        title: 'Readiness response',
        code: [
          '{',
          '  "status": "healthy",',
          '  "service": "golang-clean-architecture",',
          '  "database": { "status": "healthy" }',
          '}',
        ].join('\n'),
        alt: 'JSON body of the readiness endpoint, with the service name and a healthy database status.',
        caption: 'The /ready response: the service name, and the database reported as healthy.',
      },
    ],
    outcome:
      'Public on GitHub with migrations, a Makefile for run, test, lint and build, and a documented API.',
  },
  {
    slug: 'ai-website-builder',
    number: '04',
    title: 'AI Website Builder',
    line: 'Describe a snippet, an agent writes it, a sandbox serves it',
    summary:
      'A prototype of a prompt-to-code builder: describe a snippet, an AI agent writes it, and a sandboxed Next.js app serves the result.',
    year: '2025',
    role: 'Personal project. Prototype.',
    layers: ['screen', 'server', 'ship'],
    tracks: { screen: 'Next.js, tRPC', server: 'Inngest, Gemini 2.5 Flash', ship: 'E2B sandboxes' },
    stack: ['Next.js', 'TypeScript', 'tRPC', 'Inngest', 'Gemini 2.5 Flash', 'E2B sandboxes', 'Prisma'],
    links: [{ label: 'Source', href: 'https://github.com/Leonfarhan/ai-website-builder' }],
    cover: {
      kind: 'code',
      title: 'The pipeline',
      code: [
        'prompt     "Write a snippet"',
        'inngest    step.run("get-sandbox-id")',
        'e2b        Sandbox.create("ai-builder")',
        'agent      gemini-2.5-flash',
        'preview    https://<sandbox-host>:3000',
      ].join('\n'),
      alt: 'Five-step pipeline: prompt, Inngest step, E2B sandbox, Gemini agent and preview URL.',
      caption: 'The request path from prompt to preview, one tool per step.',
    },
    focus: 0.3,
    context:
      'Generating code is the easy half. The hard half is running fresh, untrusted code somewhere safe and showing it to the person who asked for it.',
    idea:
      'Every request becomes a background job. The job starts an E2B sandbox from a custom Next.js template, a Gemini 2.5 Flash agent writes the snippet, and the job returns the sandbox URL as the live preview.',
    craft: [
      { text: 'Background jobs through Inngest, so the request returns at once' },
      { text: 'A custom E2B sandbox image with its own Dockerfile and compile script' },
      { text: 'tRPC between the Next.js client and server' },
      { text: 'Prisma prepared for PostgreSQL' },
    ],
    frames: [
      {
        kind: 'code',
        title: 'Agent',
        code: [
          'const codeAgent = createAgent({',
          '  name: "code-agent",',
          '  system: "You are an expert next.js developer. You write readable, maintainable code.",',
          '  model: gemini({ model: "gemini-2.5-flash" }),',
          '});',
        ].join('\n'),
        alt: 'Definition of the code agent: its name, system prompt and Gemini 2.5 Flash model.',
        caption: 'The code agent: a Gemini 2.5 Flash model with a Next.js developer system prompt.',
      },
      {
        kind: 'code',
        title: 'Sandbox template',
        code: 'sandbox-templates/nextjs/  e2b.Dockerfile  e2b.toml  compile_page.sh',
        alt: 'File list of the sandbox template: the Next.js folder, e2b.Dockerfile, e2b.toml and compile_page.sh.',
        caption: 'The sandbox template folder: the Next.js template with its Dockerfile, E2B config and compile script.',
      },
    ],
    outcome:
      'A working prototype, public on GitHub. The agent loop and the sandbox run; the product around them is the next step.',
  },
  {
    slug: 'opencv-image-editor',
    number: '05',
    title: 'OpenCV Image Editor',
    line: 'Grayscale and crop, processed in your browser',
    summary:
      'An image editor that runs entirely in the browser: upload, grayscale, crop and download, processed with OpenCV.js.',
    year: '2024',
    role: 'Personal project.',
    layers: ['screen'],
    tracks: { screen: 'Next.js, OpenCV.js' },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenCV.js'],
    links: [
      { label: 'Visit site', href: 'https://nextjs-opencv-image-editor.vercel.app' },
      { label: 'Source', href: 'https://github.com/Leonfarhan/nextjs-opencv-image-editor' },
    ],
    cover: {
      kind: 'image',
      src: '/work/opencv-image-editor/cover.jpg',
      width: 1600,
      height: 1000,
      alt: 'OpenCV Image Editor after Apply Grayscale: the uploaded thesis welcome screen in grayscale',
      caption: 'After Apply Grayscale: the uploaded image shows in grayscale, with the Download Image button below.',
    },
    focus: 0.5,
    context:
      'Most image tools send your photo to a server. For simple edits there’s no reason to: the browser can do the work.',
    idea:
      'Load OpenCV.js on the client and process on the visitor’s own machine. No upload, no storage, no round trip.',
    craft: [
      { text: 'Grayscale through OpenCV.js' },
      { text: 'Crop' },
      { text: 'A loading state while OpenCV works' },
      { text: 'Download of the edited file' },
      { text: 'Responsive layout in Tailwind CSS' },
    ],
    frames: [
      {
        kind: 'image',
        src: '/work/opencv-image-editor/frame-1.jpg',
        width: 1600,
        height: 1000,
        alt: 'OpenCV Image Editor before any upload: the Upload Your Image card with no file chosen',
        caption: 'The empty state: the upload card with no file chosen, and the Apply Grayscale and Crop Image buttons below the picker.',
      },
      {
        kind: 'image',
        src: '/work/opencv-image-editor/frame-2.jpg',
        width: 780,
        height: 1688,
        alt: 'OpenCV Image Editor on a phone: the grayscale preview with full-width buttons stacked below',
        caption: 'Phone layout after Apply Grayscale: full-width buttons stacked under the grayscale preview.',
      },
    ],
    outcome: 'Live at nextjs-opencv-image-editor.vercel.app, with the source on GitHub.',
  },
];

export const experienceSection: {
  track: Track;
  nowLabel: string;
} = {
  track: { id: 'A1', name: 'Experience' },
  nowLabel: 'Now',
};

export const experience: Experience[] = [
  {
    company: 'Ternak Klip (PT Media Klip Nusantara)',
    title: 'Full stack engineer',
    period: 'Jul 2026 to Present',
    current: true,
    description:
      'Building creator-campaign workflows and transactional reward settlements with Next.js, Go and PostgreSQL, Xendit virtual account payouts with idempotency guards, and double-entry accounting in NestJS.',
    tech: ['Next.js', 'Go (Gin)', 'NestJS', 'PostgreSQL', 'Xendit', 'Drizzle ORM'],
  },
  {
    company: 'PT Optimal Untuk Negeri',
    title: 'Software engineer',
    period: 'Aug 2025 to Jul 2026',
    description:
      'Built full-stack production features for cbtoptimal.com across 8.4K+ users: timed exams in React, APIs in Go (Fiber), Mayar.id payments, Groq analytics, and DigitalOcean cloud infrastructure.',
    tech: ['React', 'Go (Fiber)', 'PostgreSQL', 'DigitalOcean', 'Nginx', 'Mayar.id', 'Groq'],
  },
  {
    company: 'PT Formulatrix Indonesia',
    title: 'Software engineer intern',
    period: 'Jan 2025 to Mar 2025',
    description:
      'Fixed React.js bugs and Redux state-management issues, refactored frontend components to team standards, and contributed to code review and Agile discussions.',
    tech: ['React', 'Redux', 'SCSS', 'MUI'],
  },
  {
    company: 'PT Pupuk Indonesia (Persero)',
    title: 'Full stack engineer intern',
    period: 'Aug 2023 to Oct 2023',
    description:
      'Built internal REST APIs with FastAPI, Python, and MongoDB; configured Nginx on Linux VPS and developed responsive React and Tailwind CSS interfaces.',
    tech: ['FastAPI', 'Python', 'MongoDB', 'Nginx', 'React', 'Tailwind CSS'],
  },
  {
    company: 'Computer Science Student Association (HMIK)',
    title: 'Head of project management',
    period: 'Jan 2023 to Nov 2023',
    description:
      'Led delivery of the student association website in Next.js and Tailwind CSS with real-time API integration and stakeholder coordination.',
    tech: ['Next.js', 'Tailwind CSS'],
  },
];

export const stackSection: { track: Track } = {
  track: { id: 'Bin', name: 'Stack' },
};

export const stack: StackBlock[] = [
  {
    layer: 'screen',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'SCSS', 'MUI'],
  },
  {
    layer: 'server',
    items: ['Go (Fiber, Chi, Gin)', 'NestJS', 'FastAPI', 'tRPC'],
  },
  {
    layer: 'data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Prisma'],
  },
  {
    layer: 'ship',
    items: ['Docker', 'Nginx', 'DigitalOcean', 'AWS', 'Vercel', 'Git and GitHub'],
  },
];

export const methodSection: { track: Track; heading: string } = {
  track: { id: 'V2', name: 'Method' },
  heading: 'Two projects, cut two ways.',
};

export const methods: Method[] = [
  {
    name: 'Agile',
    title: 'Learning Skill, 2023 to 2024',
    body: 'I led the team on Learning Skill, a community platform for trading skills and knowledge for free. We worked in short sprints with daily stand-ups and tested every sprint, so priorities could move when users told us something new.',
    image: {
      kind: 'image',
      src: '/work/method/learningskill.jpg',
      width: 1600,
      height: 882,
      alt: 'Learning Skill sign-in screen with the book logo',
    },
    cut: { kind: 'sprints', count: 8, label: 'Sprint' },
  },
  {
    name: 'Waterfall',
    title: 'Thesis: graduation prediction, 2024',
    body: 'My thesis at Pertamina University was a web system that predicts whether a computer science student will graduate on time, using Naive Bayes on academic records. Requirements came from questionnaires and interviews, then design, build and test, in that order. The fixed order kept the thesis on schedule and made late changes expensive.',
    image: {
      kind: 'image',
      src: '/work/method/appthesis.jpg',
      width: 1600,
      height: 882,
      alt: 'Welcome screen of the graduation prediction system, in Indonesian',
    },
    cut: { kind: 'phases', phases: ['Requirements', 'Design', 'Build', 'Test'] },
  },
];

export const footer: {
  track: Track;
  heading: string;
  cta: string;
  watched: string;
  backToTop: string;
  copyright: string;
  colophon: string;
} = {
  track: { id: 'Export', name: 'Contact' },
  heading: 'Got a role or a project?',
  cta: 'Email me',
  watched: 'Watched {tc} of this sequence',
  backToTop: 'Back to top',
  copyright: '© 2026 Farhan Alwahid',
  colophon: 'Set in Bricolage Grotesque and TikTok Sans. Built with Next.js, GSAP and Lenis.',
};

export const casePage: {
  clipLabel: string;
  back: string;
  tracks: string;
  subtitles: Track;
  role: string;
  year: string;
  stack: string;
  links: string;
  context: string;
  idea: string;
  checks: string;
  frames: string;
  frameLabel: string;
  outcome: string;
  next: string;
  newTab: string;
} = {
  clipLabel: 'Clip {n} of {total}',
  back: 'All clips',
  tracks: 'Tracks',
  subtitles: { id: 'S1', name: 'Subtitles' },
  role: 'Role',
  year: 'Year',
  stack: 'Stack',
  links: 'Links',
  context: 'Context',
  idea: 'Idea',
  checks: 'Checks',
  frames: 'Frames',
  frameLabel: 'Frame {n}',
  outcome: 'Outcome',
  next: 'Next clip',
  newTab: '(opens in a new tab)',
};

export const notFound: {
  title: string;
  field: string;
  heading: string;
  body: string;
  cta: string;
} = {
  title: 'Media offline',
  field: 'Media offline',
  heading: 'This clip is offline.',
  body: 'The link points to footage that isn’t here. It may be mistyped, or the page has moved.',
  cta: 'Back to the timeline',
};
