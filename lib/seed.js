import db from "./db.js";

const jobs = [
  {
    externalId: "demo-001",
    source: "LinkedIn",
    title: "Software Engineer",
    company: "TechNova",
    location: "Bangalore, India",
    salary: "₹8L - ₹14L",
    description: "Build scalable web applications and backend services.",
    url: "https://www.linkedin.com/",
    employmentType: "Full-time",
    remoteType: "Hybrid",
    experience: "2-4 years",
    postedAt: new Date().toISOString(),
  },
  {
    externalId: "demo-002",
    source: "Naukri",
    title: "Frontend Developer",
    company: "Pixel Labs",
    location: "Bangalore, India",
    salary: "₹6L - ₹12L",
    description: "Develop modern responsive web applications using React.",
    url: "https://www.naukri.com/",
    employmentType: "Full-time",
    remoteType: "Remote",
    experience: "1-3 years",
    postedAt: new Date().toISOString(),
  },
  {
    externalId: "demo-003",
    source: "LinkedIn",
    title: "SDET",
    company: "CloudWorks",
    location: "Hyderabad, India",
    salary: "₹7L - ₹15L",
    description: "Build automation frameworks and test complex applications.",
    url: "https://www.linkedin.com/",
    employmentType: "Full-time",
    remoteType: "Hybrid",
    experience: "2-5 years",
    postedAt: new Date().toISOString(),
  },
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO jobs (
    externalId,
    source,
    title,
    company,
    location,
    salary,
    description,
    url,
    employmentType,
    remoteType,
    experience,
    postedAt
  )
  VALUES (
    @externalId,
    @source,
    @title,
    @company,
    @location,
    @salary,
    @description,
    @url,
    @employmentType,
    @remoteType,
    @experience,
    @postedAt
  )
`);

const seed = db.transaction((jobs) => {
  for (const job of jobs) {
    insert.run(job);
  }
});

seed(jobs);

console.log("Jobs seeded successfully.");