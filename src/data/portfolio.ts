// Edit this file to update your portfolio content.
export const profile = {
  name: "Bhavishya Patil",
  email: "your.email@example.com", // TODO: replace with your real email
  github: "https://github.com/your-username", // TODO
  linkedin: "https://www.linkedin.com/in/your-profile", // TODO
};

export const languages = [
  { name: "Python", note: "Scripting, OOP, problem solving" },
  { name: "C", note: "Procedural logic & fundamentals" },
  { name: "C++", note: "Object-oriented programming" },
];

export const interests = [
  "Artificial Intelligence",
  "Cybersecurity",
  "Software Development",
  "Data Structures & Algorithms",
  "Web Development",
];

export type Project = {
  title: string;
  status: "Concept" | "Working" | "Collection";
  problem: string;
  description: string;
  tech: string[];
  projectUrl?: string;
  sourceUrl?: string;
  glyph: string;
};

export const projects: Project[] = [
  {
    title: "AI-Powered Cybersecurity Awareness",
    status: "Concept",
    problem: "People fall for phishing because they rarely practise spotting it safely.",
    description:
      "A concept that simulates safe threat scenarios, evaluates user responses, and offers personalised learning paths to improve phishing awareness.",
    tech: ["Python", "AI", "Cybersecurity"],
    glyph: "{ ⚠ }",
  },
  {
    title: "Python Programming Collection",
    status: "Collection",
    problem: "Building a solid foundation in core programming concepts.",
    description:
      "Programs covering prime checks, digit sums, class-based account management, recursive GCD, Armstrong numbers and temperature conversion.",
    tech: ["Python", "OOP", "Recursion"],
    sourceUrl: "https://github.com/your-username", // TODO: repo link
    glyph: "py()",
  },
  {
    title: "C and C++ Programming Projects",
    status: "Collection",
    problem: "Practising logic, memory-aware thinking and object-oriented design.",
    description:
      "Exercises and implementations demonstrating functions, logical thinking, OOP and foundational computer science concepts.",
    tech: ["C", "C++", "OOP"],
    sourceUrl: "https://github.com/your-username", // TODO: repo link
    glyph: "#include",
  },
];

// Add real repositories here. Leave empty fields out rather than inventing data.
export const repositories = [
  { name: "python-programs", description: "Add a short description of this repository.", language: "Python" },
  { name: "c-cpp-programs", description: "Add a short description of this repository.", language: "C / C++" },
];

// Timeline — replace placeholders with verified details only.
export const journey = [
  { date: "[Year]", title: "Started B.E./B.Tech in Computer Science Engineering", detail: "[Add your college name]" },
  { date: "[Year]", title: "Wrote my first programs in C and Python", detail: "Learned fundamentals of logic and problem solving." },
  { date: "[Year]", title: "Built my Python & C/C++ programming collections", detail: "Practised OOP, recursion and core algorithms." },
  { date: "[Upcoming]", title: "Hackathons, certifications & next milestones", detail: "[Add verified achievements here]" },
];
