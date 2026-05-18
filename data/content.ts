/**
 * Edit this file to update copy. Works can be description-only: omit `url` and `urlLabel`.
 */
export const profile = {
  name: "John Andre De la Cuesta",
  navName: "Andre",
  /** Decorative check mark beside your name; set false to hide. */
  verified: true,
  location: "Tandag City, Surigao Del Sur",
  tagline: "Graphic Designer • Full-Stack Developer • AI Enthusiast",
  headline: "",
  email: "johndelacuesta5@gmail.com",
  phone: "+63 906 463 4580",
  /** Calendly (https://…) or `#contact` for footer. */
  scheduleUrl: "https://calendly.com/johndelacuesta5/new-meeting",
  imageSrc: "/profile-2.png",
};

export const projectItems: {
  title: string;
  slug: string;
  description: string;
  mockupColor: string;
  tags: string[];
}[] = [
  {
    slug: "social-media-designs",
    title: "Social Media Designs",
    description:
      "Feeds, carousels, and campaign assets aligned to platform specs and brand voice. Every piece is crafted to stop the scroll while staying true to the client's visual identity.",
    mockupColor: "#6366f1",
    tags: ["Graphic Design", "Social Media", "Branding"],
  },
  {
    slug: "poster-designs",
    title: "Poster Designs",
    description:
      "Events, promos, and print-ready layouts tuned for quick scanning. From concept to press-ready files with bleed marks and color-safe exports.",
    mockupColor: "#ec4899",
    tags: ["Print", "Graphic Design", "Layout"],
  },
  {
    slug: "logo-identity",
    title: "Logo & Identity",
    description:
      "Marks and light systems that stay clear from favicon to print. Full brand kits with color codes, type pairings, and usage guidelines.",
    mockupColor: "#f59e0b",
    tags: ["Branding", "Logo", "Identity"],
  },
  {
    slug: "merch-designs",
    title: "Merch Designs",
    description:
      "Graphics ready for vendors with clean layers and production notes. T-shirts, stickers, mugs — all exported in vendor-ready formats.",
    mockupColor: "#10b981",
    tags: ["Merchandise", "Print", "Production"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Flows and UI kits that balance clarity with personality. End-to-end mobile experiences from wireframes to high-fidelity prototypes with interactive components.",
    mockupColor: "#8b5cf6",
    tags: ["UI/UX", "Mobile", "Figma"],
  },
  {
    slug: "android-apps",
    title: "Android Apps",
    description:
      "Material-aware layouts and performance-minded structure. Native Android applications built with modern architecture patterns and smooth animations.",
    mockupColor: "#3b82f6",
    tags: ["Android", "Java", "Kotlin"],
  },
  {
    slug: "websites",
    title: "Websites",
    description:
      "Responsive marketing sites and apps with accessible components. From landing pages to full-stack web applications — pixel-perfect and performant.",
    mockupColor: "#14b8a6",
    tags: ["Web", "React", "Next.js"],
  },
  {
    slug: "gohighlevel-funnels",
    title: "GoHighLevel Funnels",
    description:
      "High-converting sales funnels and landing pages built on GoHighLevel. Optimized for lead generation with seamless CRM integration, automated follow-ups, and conversion-focused design.",
    mockupColor: "#f97316",
    tags: ["Funnels", "GoHighLevel", "Marketing"],
  },
];

export const certifications: { title: string; issuer: string }[] = [
  // Add your certificates here, or leave the array empty.
  // { title: "Example Certification", issuer: "Issuing Org" },
];

/** Full-color logos via Devicon `*-original.svg` (Simple Icons are single-color). */
export const tools: { name: string; iconSrc: string }[] = [
  {
    name: "Android Studio",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
  },
  {
    name: "Visual Studio Code",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  {
    name: "Figma",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "Photoshop",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
  },
  {
    name: "Illustrator",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg",
  },
  {
    name: "Canva",
    iconSrc:
      "https://cdn.brandfetch.io/id9mVQlyB1/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1725863485997",
  },
  {
    name: "Premiere Pro",
    iconSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
  },
  {
    name: "CapCut",
    iconSrc: "https://www.google.com/s2/favicons?domain=capcut.com&sz=128",
  },
];


export const frontend: { name: string; iconSrc: string }[] = [
  { name: "JavaScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Vue.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "Tailwind CSS", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "SCSS", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { name: "Styled Components", iconSrc: "https://www.google.com/s2/favicons?domain=styled-components.com&sz=128" },
];

export const backend: { name: string; iconSrc: string }[] = [
  { name: "Node.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Java", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "PHP", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Express.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "NestJS", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
  { name: "FastAPI", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Spring Boot", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "Laravel", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "PostgreSQL", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
];

export const devtools: { name: string; iconSrc: string }[] = [
  { name: "Git", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "GitLab", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
  { name: "VS Code", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Slack", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg" },
  { name: "Discord", iconSrc: "https://www.google.com/s2/favicons?domain=discord.com&sz=128" },
  { name: "Microsoft Teams", iconSrc: "https://www.google.com/s2/favicons?domain=teams.microsoft.com&sz=128" },
  { name: "ClickUp", iconSrc: "https://www.google.com/s2/favicons?domain=clickup.com&sz=128" },
];

export const experience = [
  {
    year: "2023",
    title: "BS Information Technology",
    org: "Ateneo de Davao University",
  },
  {
    year: "2023",
    title: "Graphic Designer",
    org: "Dre Graphx",
  },
  {
    year: "2023",
    title: "Graphic Designer",
    org: "Makers Avenue",
  },
  {
    year: "2025-Present",
    title: "Graphic Designer & Developer",
    org: "TAC PRO",
  },
  {
    year: "2025-Present",
    title: "Graphic Designer & Developer",
    org: "GN TRAVEL MARKETING LLC",
  },
];

export const aboutParagraphs = [
  "I'm a full-stack developer, graphic designer, and UI/UX designer who creates engaging visuals, videos, and digital experiences. By combining design and development, I turn ideas into functional and visually compelling solutions.",
  "I focus on the details so every project feels polished, user-friendly, and aligned with client goals. I like exploring new styles and techniques so deliverables stay fresh.",
  "Recently I've leaned into AI: integrating tools into apps, shipping smarter features, and using generative workflows where they actually save time.",
];

export const social = {
  linkedin: "",
  github: "https://github.com/Drdrez",
  facebook: "https://www.facebook.com/johnandre.delacuesta",
  instagram: "",
  behance: "",
};
