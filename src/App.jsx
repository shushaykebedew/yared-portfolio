import React, { useMemo, useState, useRef } from "react";
import yaredCV from "./assets/yaredcv.pdf";
import Sheqlee_freelance from "./assets/apks/Sheqlee_freelance.apk";
import Aluminum_workshop from "./assets/apks/Aluminum_workshop.apk";
import mvet_v1 from "./assets/apks/mvet_v1.apk";
import profile from "./assets/profile.jpg";
import food from "./assets/food.jpg";
import aluminum from "./assets/aluminum.jpg";
import sheqlee from "./assets/sheqlee.PNG";
import mvet from "./assets/mvet/1.jpg";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Globe,
  ArrowDownToLine,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Search,
  Filter,
  Moon,
  Sun,
  MapPin,
  Briefcase,
  Code2,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Import Email.js
import emailjs from "@emailjs/browser";

// --- Data ------------------------------------------------------------
const PROFILE = {
  name: "Yared Gebrezgabher Asgedom",
  title: "Mobile App Developer (Flutter/Dart)",
  location: "Addis Ababa, Ethiopia",
  intro:
    "I build reliable, user‑focused mobile apps with Flutter & Dart, backed by solid foundations in algorithms, Java, and Python. I care about clean architecture, performance, and delightful UI/UX.",
  email: "yaredgzr7@gmail.com",
  phone: "+251 932 336 481",
  github: "https://github.com/yaredgzr",
  linkedin: "https://www.linkedin.com/in/yared-asgedom",
};

const SKILLS = [
  {
    group: "Core",
    list: [
      "Flutter",
      "Dart",
      "Java",
      "Python",
      "REST APIs",
      "Git",
      "CI/CD",
      "AI",
      "Machine Learning",
      "NLP",
    ],
  },
  {
    group: "App Craft",
    list: [
      "Clean Architecture",
      "State Management",
      "BloC/GetX/Provider",
      "Firebase",
      "SQLite",
      "Push Notifications",
      "Secure Storage",
      "API Integration",
      "Performance Optimization",
    ],
  },
  {
    group: "UI/UX",
    list: ["Figma", "Responsive Design", "Animations", "Accessibility"],
  },
];

const EXPERIENCE = [
  {
    company: "Grand Technology Solutions",
    role: "Mobile App Developer",
    period: "May 2023 – June 2025",
    points: [
      "Led the development of a full mobile app system end‑to‑end (requirements, UI/UX, implementation, testing).",
      "Formulated efficient algorithms with strong time/space complexity awareness.",
      "Collaborated cross‑functionally and shipped features on schedule.",
    ],
  },
  {
    company: "Metnee Systems PLC",
    role: "Flutter Mobile App Developer Intern",
    period: "Nov 2024 – March 2025",
    points: [
      "Built features in Flutter and contributed to code reviews and documentation.",
      "Gained hands‑on experience with agile workflows and client feedback loops.",
    ],
  },
];

const EDUCATION = [
  {
    school: "BSc in Information Technology",
    org: "Mekelle University – MIT",
    period: "Graduated June, 2025",
  },
];

const PROJECTS = [
  {
    title: "Freelancing Marketplace (Ethiopia)",
    summary:
      "A platform where clients post jobs and freelancers apply. Tailored for local payment realities and mobile‑first usage.",
    highlights: [
      "Job posting & applications",
      "Profiles & reviews",
      "Real‑time updates",
    ],
    tech: ["Flutter", "Dart", "NodeJs", "React.Js", "MongoDB"],
    category: "Business",
    images: [sheqlee],
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Aluminum Workshop Manager",
    summary:
      "Drag‑and‑drop product designer for local aluminum workers with inventory tracking and cost estimation.",
    highlights: ["Visual designer", "Materials tracking", "Cost estimates"],
    tech: ["Flutter", "Dart", "SQLite", "Node.Js", "MongoDB"],
    category: "Productivity",
    images: [aluminum],
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Local Restaurant Delivery App",
    summary:
      "End‑to‑end ordering and delivery flow for local restaurants with order status and courier assignment.",
    highlights: ["Menus & cart", "Checkout & tracking", "Admin dashboard"],
    tech: ["Flutter", "Dart", "Firebase"],
    category: "FoodTech",
    images: [food],
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Mobile Vet(Mvet)",
    summary:
      "Mvet is a mobile app for vets to track patient histories, register animals, and view daily, weekly, monthly, and annual reports.",
    highlights: ["Dataset curation", "Model selection", "On‑device inference"],
    tech: ["Flutter", "NodeJs", "MySQL"],
    category: "HealthTech",
    images: [mvet],
    links: { demo: "#", repo: "#" },
  },
  {
    title: "AI Fraud Detection for Banks (Research)",
    summary:
      "Team project exploring ML techniques for anomaly detection in banking transactions.",
    highlights: [
      "Feature engineering",
      "Model evaluation",
      "Imbalanced data handling",
    ],
    tech: ["Python", "Scikit‑learn", "Pandas"],
    category: "FinTech",
    images: [""],
    links: { demo: "#", repo: "#" },
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

// --- UI Helpers ------------------------------------------------------
const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="scroll-mt-24 py-12 sm:py-16">
       {" "}
    <div className="max-w-6xl mx-auto px-4">
           {" "}
      <div className="flex items-center gap-3 mb-6">
                {Icon && <Icon className="w-6 h-6" />}       {" "}
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>     {" "}
      </div>
            {children}   {" "}
    </div>
     {" "}
  </section>
);

// --- App -------------------------------------------------------------
export default function Portfolio() {
  const apks = [
    { name: "Sheqlee Freelance.apk", file: Sheqlee_freelance },
    { name: "Aluminum Workshop.apk", file: Aluminum_workshop },
    { name: "Mvet v1.apk", file: mvet_v1 },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All"); // Added for Email.js

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
          form.current.reset(); // Clear the form fields
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  const filtered = useMemo(() => {
    return PROJECTS.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.summary.toLowerCase().includes(query.toLowerCase()) ||
          p.tech.join(" ").toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, cat]);

  return (
    <div className={dark ? "dark" : ""}>
           {" "}
      <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors">
                {/* Header */}       {" "}
        <header className="sticky top-0 z-40 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-950/50">
                   {" "}
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                       {" "}
            <div className="flex items-center gap-3">
                           {" "}
              <div className="w-8 h-8  bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl">
                               {" "}
                <img src={profile} alt="" className="rounded-full" />           
                 {" "}
              </div>
                           {" "}
              <span className="font-semibold">
                                {PROFILE.name.split(" ")[0]} • Portfolio        
                     {" "}
              </span>
                         {" "}
            </div>
                       {" "}
            <nav className="hidden sm:flex items-center gap-6 text-sm">
                           {" "}
              <a href="#home" className="hover:opacity-80">
                                Home              {" "}
              </a>
                           {" "}
              <a href="#about" className="hover:opacity-80">
                                About              {" "}
              </a>
                           {" "}
              <a href="#skills" className="hover:opacity-80">
                                Skills              {" "}
              </a>
                           {" "}
              <a href="#projects" className="hover:opacity-80">
                                Projects              {" "}
              </a>
                           {" "}
              <a href="#experience" className="hover:opacity-80">
                                Experience              {" "}
              </a>
                           {" "}
              <a href="#contact" className="hover:opacity-80">
                                Contact              {" "}
              </a>
                         {" "}
            </nav>
                       {" "}
            <div className="flex items-center gap-2">
                           {" "}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle theme"
              >
                               {" "}
                {dark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                             {" "}
              </Button>
                           {" "}
              <Button
                className="sm:hidden"
                variant="outline"
                size="icon"
                onClick={() => setMenuOpen((m) => !m)}
              >
                               {" "}
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                             {" "}
              </Button>
                       {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          {menuOpen && (
            <div className="sm:hidden border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 space-y-2">
                           {" "}
              {[
                ["#home", "Home"],
                ["#about", "About"],
                ["#skills", "Skills"],
                ["#projects", "Projects"],
                ["#experience", "Experience"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1"
                >
                                    {label}               {" "}
                </a>
              ))}
                         {" "}
            </div>
          )}
                 {" "}
        </header>
                {/* Hero */}       {" "}
        <Section id="home" title="" icon={null}>
                   {" "}
          <div className="grid md:grid-cols-2 gap-8 items-center">
                       {" "}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                           {" "}
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                                {PROFILE.name}             {" "}
              </h1>
                           {" "}
              <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300">
                                {PROFILE.title}             {" "}
              </p>
                           {" "}
              <p className="mt-4 max-w-prose text-neutral-700 dark:text-neutral-300">
                                {PROFILE.intro}             {" "}
              </p>
                           {" "}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                               {" "}
                <Badge className="rounded-2xl px-3 py-1" variant="secondary">
                                    <MapPin className="w-3.5 h-3.5 mr-1" />{" "}
                  {PROFILE.location}               {" "}
                </Badge>
                               {" "}
                <Badge className="rounded-2xl px-3 py-1" variant="secondary">
                                    <Phone className="w-4 h-4" />{" "}
                  {PROFILE.phone}               {" "}
                </Badge>
                               {" "}
                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                                   {" "}
                  <Button variant="outline" className="gap-2">
                                        <Github className="w-4 h-4" /> GitHub  
                                   {" "}
                  </Button>
                                 {" "}
                </a>
                               {" "}
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                                   {" "}
                  <Button variant="outline" className="gap-2">
                                        <Linkedin className="w-4 h-4" />{" "}
                    LinkedIn                  {" "}
                  </Button>
                                 {" "}
                </a>
                               {" "}
                <a href={yaredCV} download>
                                   {" "}
                  <Button className="gap-2 cursor-pointer">
                                        <ArrowDownToLine className="w-4 h-4" />{" "}
                    Download CV                  {" "}
                  </Button>
                                 {" "}
                </a>
                             {" "}
              </div>
                         {" "}
            </motion.div>
                       {" "}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
                           {" "}
              <Card className="rounded-2xl">
                               {" "}
                <CardContent className="p-4 space-y-2">
                                   {" "}
                  <h3 className="font-semibold text-lg">Download APKs</h3>     
                             {" "}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Click below to download the app files  
                                   {" "}
                  </p>
                                   {" "}
                  <ul className="space-y-1">
                                       {" "}
                    {apks.map((apk, idx) => (
                      <li key={idx}>
                                               {" "}
                        <a
                          href={apk.file}
                          download
                          className="flex items-center justify-between p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                        >
                                                    <span>{apk.name}</span>     
                                             {" "}
                          <ArrowDownToLine className="w-4 h-4" />               
                                 {" "}
                        </a>
                                             {" "}
                      </li>
                    ))}
                                     {" "}
                  </ul>
                                 {" "}
                </CardContent>
                             {" "}
              </Card>
                         {" "}
            </motion.div>
                     {" "}
          </div>
                 {" "}
        </Section>
                {/* About */}       {" "}
        <Section id="about" title="About Me" icon={Code2}>
                   {" "}
          <div className="grid md:grid-cols-3 gap-6">
                       {" "}
            <Card className="md:col-span-2 rounded-2xl">
                           {" "}
              <CardHeader>
                                <CardTitle>Who I Am</CardTitle>             {" "}
              </CardHeader>
                           {" "}
              <CardContent className="space-y-3">
                               {" "}
                <p>
                                    I'm a mobile developer with nearly two years
                  building Flutter                   apps. I enjoy collaborating
                  with teams and believe complex                   problems are
                  solved best together. Outside work, I like                  
                  watching movies, listening to a music, working out, and      
                              spending time with loved ones.                {" "}
                </p>
                               {" "}
                <p>
                                    I’m currently focusing on applying AI in
                  real‑world apps,                   especially healthcare and
                  fintech use cases.                {" "}
                </p>
                             {" "}
              </CardContent>
                         {" "}
            </Card>
                       {" "}
            <Card className="rounded-2xl">
                           {" "}
              <CardHeader>
                                <CardTitle>Quick Info</CardTitle>             {" "}
              </CardHeader>
                           {" "}
              <CardContent className="space-y-2 text-sm">
                               {" "}
                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> {PROFILE.email}
                                 {" "}
                </div>
                               {" "}
                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />{" "}
                  {PROFILE.phone}               {" "}
                </div>
                               {" "}
                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />{" "}
                  {PROFILE.location}               {" "}
                </div>
                             {" "}
              </CardContent>
                         {" "}
            </Card>
                     {" "}
          </div>
                 {" "}
        </Section>
                {/* Skills */}       {" "}
        <Section id="skills" title="Skills" icon={ChevronRight}>
                   {" "}
          <div className="grid md:grid-cols-3 gap-4">
                       {" "}
            {SKILLS.map((s) => (
              <Card key={s.group} className="rounded-2xl">
                               {" "}
                <CardHeader>
                                   {" "}
                  <CardTitle className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4" />{" "}
                    {s.group}                 {" "}
                  </CardTitle>
                                 {" "}
                </CardHeader>
                               {" "}
                <CardContent className="flex flex-wrap gap-2">
                                   {" "}
                  {s.list.map((k) => (
                    <Badge
                      key={k}
                      variant="secondary"
                      className="rounded-2xl px-3 py-1"
                    >
                                            {k}                   {" "}
                    </Badge>
                  ))}
                                 {" "}
                </CardContent>
                             {" "}
              </Card>
            ))}
                     {" "}
          </div>
                 {" "}
        </Section>
                {/* Projects */}       {" "}
        <Section id="projects" title="Projects" icon={Briefcase}>
                   {" "}
          <Card className="rounded-2xl mb-4">
                       {" "}
            <CardContent className="p-4">
                           {" "}
              <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
                               {" "}
                <div className="flex gap-2 items-center">
                                    <Filter className="w-4 h-4" />             
                     {" "}
                  <div className="flex gap-2 flex-wrap">
                                       {" "}
                    {CATEGORIES.map((c) => (
                      <Button
                        key={c}
                        size="sm"
                        variant={cat === c ? "default" : "outline"}
                        onClick={() => setCat(c)}
                        className="rounded-2xl"
                      >
                                                {c}                     {" "}
                      </Button>
                    ))}
                                     {" "}
                  </div>
                                 {" "}
                </div>
                               {" "}
                <div className="flex gap-2 items-center max-w-sm w-full">
                                    <Search className="w-4 h-4" />             
                     {" "}
                  <Input
                    placeholder="Search projects, tech…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </CardContent>
                     {" "}
          </Card>
                   {" "}
          <div className="grid md:grid-cols-2 gap-6">
                       {" "}
            {filtered.map((p) => (
              <Card key={p.title} className="rounded-2xl overflow-hidden">
                               {" "}
                <CardHeader>
                                    <CardTitle>{p.title}</CardTitle>           
                     {" "}
                </CardHeader>
                               {" "}
                <CardContent className="space-y-3">
                                   {" "}
                  <div className="aspect-video rounded-xl bg-neutral-200/60 dark:bg-neutral-800/60 grid place-items-center">
                                       {" "}
                    {/* <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Add screenshots: {p.images[0]}
                    </span> */}
                                       {" "}
                    <img
                      src={p.images[0]}
                      alt={`${p.title} screenshot`}
                      className="w-30 object-cover rounded-xl"
                      onError={(e) =>
                        (e.target.src = "/assets/fallback-image.png")
                      } // Optional
                    />
                                     {" "}
                  </div>
                                   {" "}
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                        {p.summary}                 {" "}
                  </p>
                                   {" "}
                  <div className="flex flex-wrap gap-2">
                                       {" "}
                    {p.highlights.map((h) => (
                      <Badge
                        key={h}
                        className="rounded-2xl px-3 py-1"
                        variant="secondary"
                      >
                                                {h}                     {" "}
                      </Badge>
                    ))}
                                     {" "}
                  </div>
                                   {" "}
                  <div className="flex flex-wrap gap-2">
                                       {" "}
                    {p.tech.map((t) => (
                      <Badge key={t} className="rounded-2xl px-3 py-1">
                                                {t}                     {" "}
                      </Badge>
                    ))}
                                     {" "}
                  </div>
                                   {" "}
                  <div className="flex gap-2 pt-2">
                                       {" "}
                    <a href={p.links.demo} target="_blank" rel="noreferrer">
                                           {" "}
                      <Button variant="outline" className="gap-2">
                                               {" "}
                        <ExternalLink className="w-4 h-4" /> Demo              
                               {" "}
                      </Button>
                                         {" "}
                    </a>
                                       {" "}
                    <a href={p.links.repo} target="_blank" rel="noreferrer">
                                           {" "}
                      <Button variant="outline" className="gap-2">
                                                <Github className="w-4 h-4" />{" "}
                        Code                      {" "}
                      </Button>
                                         {" "}
                    </a>
                                     {" "}
                  </div>
                                 {" "}
                </CardContent>
                             {" "}
              </Card>
            ))}
                     {" "}
          </div>
                 {" "}
        </Section>
                {/* Experience */}       {" "}
        <Section id="experience" title="Experience" icon={Briefcase}>
                   {" "}
          <div className="grid md:grid-cols-2 gap-6">
                       {" "}
            {EXPERIENCE.map((e) => (
              <Card key={e.company} className="rounded-2xl">
                               {" "}
                <CardHeader>
                                   {" "}
                  <CardTitle className="flex items-center justify-between">
                                       {" "}
                    <span>
                                            {e.role} • {e.company}             
                           {" "}
                    </span>
                                       {" "}
                    <span className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
                                            {e.period}                   {" "}
                    </span>
                                     {" "}
                  </CardTitle>
                                 {" "}
                </CardHeader>
                               {" "}
                <CardContent>
                                   {" "}
                  <ul className="list-disc ml-5 space-y-2 text-sm">
                                       {" "}
                    {e.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                                     {" "}
                  </ul>
                                 {" "}
                </CardContent>
                             {" "}
              </Card>
            ))}
                       {" "}
            <Card className="rounded-2xl">
                           {" "}
              <CardHeader>
                               {" "}
                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />{" "}
                  Education                {" "}
                </CardTitle>
                             {" "}
              </CardHeader>
                           {" "}
              <CardContent className="space-y-3 text-sm">
                               {" "}
                {EDUCATION.map((ed) => (
                  <div key={ed.school}>
                                       {" "}
                    <div className="font-medium">{ed.school}</div>             
                         {" "}
                    <div className="text-neutral-600 dark:text-neutral-400">
                                            {ed.org}                   {" "}
                    </div>
                                       {" "}
                    <div className="text-neutral-600 dark:text-neutral-500">
                                            {ed.period}                   {" "}
                    </div>
                                     {" "}
                  </div>
                ))}
                             {" "}
              </CardContent>
                         {" "}
            </Card>
                     {" "}
          </div>
                 {" "}
        </Section>
                {/* Contact */}       {" "}
        <Section id="contact" title="Contact" icon={Mail}>
                   {" "}
          <div className="grid md:grid-cols-2 gap-6">
                       {" "}
            <Card className="rounded-2xl">
                           {" "}
              <CardHeader>
                                <CardTitle>Let's work together</CardTitle>     
                       {" "}
              </CardHeader>
                           {" "}
              <CardContent className="space-y-3 text-sm">
                               {" "}
                <p>
                                    Got a project or role in mind? I’m open to
                  freelance work and                   full‑time opportunities.
                  Email me or message me on LinkedIn.                {" "}
                </p>
                               {" "}
                <div className="flex flex-wrap gap-2">
                                   {" "}
                  <a href={`mailto:${PROFILE.email}`}>
                                       {" "}
                    <Button className="gap-2">
                                            <Mail className="w-4 h-4" /> Email  
                                       {" "}
                    </Button>
                                     {" "}
                  </a>
                                   {" "}
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                                       {" "}
                    <Button variant="outline" className="gap-2">
                                            <Linkedin className="w-4 h-4" />{" "}
                      LinkedIn                    {" "}
                    </Button>
                                     {" "}
                  </a>
                                   {" "}
                  <a href={PROFILE.github} target="_blank" rel="noreferrer">
                                       {" "}
                    <Button variant="outline" className="gap-2">
                                            <Github className="w-4 h-4" />{" "}
                      GitHub                    {" "}
                    </Button>
                                     {" "}
                  </a>
                                 {" "}
                </div>
                             {" "}
              </CardContent>
                         {" "}
            </Card>
                       {" "}
            <Card className="rounded-2xl">
                           {" "}
              <CardHeader>
                                <CardTitle>Quick message</CardTitle>           
                 {" "}
              </CardHeader>
                           {" "}
              <CardContent>
                               {" "}
                <form ref={form} onSubmit={sendEmail} className="space-y-3">
                                   {" "}
                  <Input name="from_name" placeholder="Your name" required />   
                               {" "}
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                                   {" "}
                  <Textarea
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    required
                  />
                                   {" "}
                  <Button type="submit" className="w-full">
                                        Send                  {" "}
                  </Button>
                                 {" "}
                </form>
                             {" "}
              </CardContent>
                         {" "}
            </Card>
                     {" "}
          </div>
                 {" "}
        </Section>
                {/* Footer */}       {" "}
        <footer className="py-10 border-t border-neutral-200/60 dark:border-neutral-800/60">
                   {" "}
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                       {" "}
            <div className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400">
                            &copy; 2025            {" "}
            </div>
                       {" "}
            <div className="flex items-center gap-3">
                           {" "}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                                <Github className="w-4 h-4" />             {" "}
              </a>
                           {" "}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                                <Linkedin className="w-4 h-4" />             {" "}
              </a>
                           {" "}
              <a href={`mailto:${PROFILE.email}`} className="hover:opacity-80">
                                <Mail className="w-4 h-4" />             {" "}
              </a>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </footer>
             {" "}
      </div>
         {" "}
    </div>
  );
}
