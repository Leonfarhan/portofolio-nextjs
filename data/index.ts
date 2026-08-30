export const navItems = [
    { name: "Home", link: "#home" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: "I prioritize collaboration with the team and encourage open communication",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/inporto.png",
      spareImg: "",
    },
    {
      id: 2,
      title: "I live in a land of natural wonders, Indonesia 🇮🇩",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Some technologies that I can use",
      description: "",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
const nextTypescriptStack = ["/next.svg", "/ts.svg", "/tail.svg", "/github.svg"];

  export const projects = [
    {
      id: 1,
      title: "CBT Optimal - UKOM Test Platform",
      des: "Computer-Based Test platform for UKOM midwifery and nursing simulations. Built end to end: React exam UI with timers and scoring, Go (Fiber) API, AI-powered weak-area reports, Mayar payments, deployed on DigitalOcean.",
      img: "/cbt-optimal.jpg",
      iconLists: ["/re.svg", "/golang.svg", "/postgresql.svg", "/docker.svg", "/digitalocean.svg"],
      link: "https://cbtoptimal.com",
    },
    {
      id: 2,
      title: "Shopmate - E-Commerce Platform",
      des: "A full-featured E-Commerce and Payment platform using NestJS, Next.js, Stripe, PostgreSQL (AWS Aurora), Docker, and AWS Elastic Beanstalk.",
      img: "/shopmate.png",
      iconLists: ["/next.svg", "/ts.svg", "/tail.svg", "/nestjs.svg", "/docker.svg", "/aws.svg"],
      link: "https://github.com/Leonfarhan/shopmate-ui",
    },
    {
      id: 2,
      title: "Golang Clean Architecture",
      des: "Clean architecture implementation in Golang featuring robust API endpoints, secure middleware, dependency injection, and clean separation of concerns.",
      img: "/go-clean-architecture.png",
      iconLists: ["/golang.svg", "/postgresql.svg", "/docker.svg", "/github.svg"],
      link: "https://github.com/Leonfarhan/golang-clean-architecture",
    },
    {
      id: 3,
      title: "AI Website Builder",
      des: "Interactive AI-powered website builder using TypeScript, Next.js, Tailwind CSS, and AI model APIs to generate custom web interfaces.",
      img: "/ai-builder.png",
      iconLists: nextTypescriptStack,
      link: "https://github.com/Leonfarhan/ai-website-builder",
    },
    {
      id: 4,
      title: "Next.js OpenCV Image Editor",
      des: "Web-based image editing application built with Next.js, TypeScript, and OpenCV.js for high-performance image manipulation in the browser.",
      img: "/opencv-editor.png",
      iconLists: nextTypescriptStack,
      link: "https://github.com/Leonfarhan/nextjs-opencv-image-editor",
    },
  ];
export const workExperience = [
  {
    id: 1,
    title: "Software Engineer - PT Optimal Untuk Negeri",
    desc: "Built the CBT Optimal platform end to end for UKOM simulations: responsive exam UI with timers and scoring, Go (Fiber) APIs, and deployment on DigitalOcean with Nginx and PostgreSQL.",
    className: "md:col-span-2",
    thumbnail: "/optimal-logo.png",
  },
  {
    id: 2,
    title: "Software Engineer Internship - PT Formulatrix Indonesia",
    desc: "Identified and resolved React UI bugs across Redux state, SCSS, and MUI. Refactored components and Redux logic to team standards and integrated backend APIs for feature development.",
    className: "md:col-span-2",
    thumbnail: "/formulatrix-logo.png",
  },
  {
    id: 3,
    title: "Full Stack Engineer Internship - PT Pupuk Indonesia (Persero)",
    desc: "Built high-performance RESTful APIs using FastAPI and MongoDB. Configured NGINX for web server optimization and developed responsive React.js and Tailwind CSS interfaces.",
    className: "md:col-span-2",
    thumbnail: "/pupuk.png",
  },
  {
    id: 4,
    title: "Head of Project Management - Computer Science Student Association",
    desc: "Developed a dynamic student association website using Next.js and Tailwind CSS with real-time API integration, creating user-friendly interfaces and collaborating with stakeholders.",
    className: "md:col-span-2",
    thumbnail: "/hmik.jpeg",
  },
];
  
  export const socialMedia = [
    {
      id: 1,
      img: "/git.svg",
      link: "https://github.com/Leonfarhan"
    },
    {
      id: 2,
      img: "/link.svg",
      link: "https://www.linkedin.com/in/farhan-alwahid/"
    },
  ];

export const techIcons = [
  "/next.svg",
  "/re.svg",
  "/tail.svg",
  "/javascript.svg",
  "/ts.svg",
  "/golang.svg",
  "/nestjs.svg",
  "/docker.svg",
  "/postgresql.svg",
  "/supabase.svg",
  "/aws.svg",
  "/mongodb.svg",
  "/mysql.svg",
  "/fastapi.svg",
  "/github.svg",
  "/digitalocean.svg",
];