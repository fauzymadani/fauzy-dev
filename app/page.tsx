'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Skills data for the carousel
    const skills = [
        { name: 'Go', icon: '/icons/go.svg' },
        { name: 'PHP', icon: '/icons/php.svg' },
        { name: 'Laravel', icon: '/icons/laravel.svg' },
        { name: 'JavaScript', icon: '/icons/javascript.svg' },
        { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
        { name: 'MariaDB', icon: '/icons/mysql.svg' },
        { name: 'Redis', icon: '/icons/redis.svg' },
        { name: 'Docker', icon: '/icons/docker.svg' },
        { name: 'AWS', icon: '/icons/aws.svg' },
        { name: 'GCP', icon: '/icons/gcp.svg' },
        { name: 'Terraform', icon: '/icons/terraform.svg' },
        { name: 'Git', icon: '/icons/git.svg' },
        { name: 'Linux', icon: '/icons/linux.svg' },
        { name: 'Kubernetes', icon: '/icons/kubernetes.svg' },
    ];

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const cardWrapper = card.closest('.holo-card-wrapper') as HTMLElement;
        if (!cardWrapper) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            const deltaX = x - centerX;
            const deltaY = y - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const fromCenter = distance / maxDistance;

            const rotateX = (deltaX / centerX) * 20; // max 20deg rotation
            const rotateY = -(deltaY / centerY) * 20;

            cardWrapper.style.setProperty('--pointer-x', `${percentX}%`);
            cardWrapper.style.setProperty('--pointer-y', `${percentY}%`);
            cardWrapper.style.setProperty('--pointer-from-center', `${fromCenter}`);
            cardWrapper.style.setProperty('--pointer-from-top', `${y / rect.height}`);
            cardWrapper.style.setProperty('--pointer-from-left', `${x / rect.width}`);
            cardWrapper.style.setProperty('--rotate-x', `${rotateX}deg`);
            cardWrapper.style.setProperty('--rotate-y', `${rotateY}deg`);
            cardWrapper.style.setProperty('--background-x', `${percentX}%`);
            cardWrapper.style.setProperty('--background-y', `${percentY}%`);
        };

        const handleMouseLeave = () => {
            cardWrapper.style.setProperty('--pointer-x', '50%');
            cardWrapper.style.setProperty('--pointer-y', '50%');
            cardWrapper.style.setProperty('--pointer-from-center', '0');
            cardWrapper.style.setProperty('--pointer-from-top', '0.5');
            cardWrapper.style.setProperty('--pointer-from-left', '0.5');
            cardWrapper.style.setProperty('--rotate-x', '0deg');
            cardWrapper.style.setProperty('--rotate-y', '0deg');
            cardWrapper.style.setProperty('--card-opacity', '0');
        };

        const handleMouseEnter = () => {
            cardWrapper.style.setProperty('--card-opacity', '1');
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Navigation */}
            <nav className="border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="font-mono text-sm">backend.dev</span>
                    <div className="flex gap-6 text-sm">
                        <a href="#work" className="hover:text-zinc-500 transition">Work</a>
                        <a href="#projects" className="hover:text-zinc-500 transition">Projects</a>
                        <a href="#stack" className="hover:text-zinc-500 transition">Stack</a>
                        <a href="#contact" className="hover:text-zinc-500 transition">Contact</a>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6">
                {/* Hero */}
                <section className="py-24 md:py-32">
                    <div className="max-w-5xl flex flex-col md:flex-row items-center gap-12">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            <Image
                                src="/icons/me.png"
                                alt="Fauzy Madani"
                                width={200}
                                height={200}
                                className="w-32 h-32 md:w-48 md:h-48 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                                priority
                            />
                        </div>

                        <div className="flex-1">
                            <div className="text-sm font-mono text-zinc-500 mb-4">$ whoami</div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Fauzy Madani
                            </h1>
                            <p className="text-2xl text-zinc-700 dark:text-zinc-300 mb-4">
                                Backend Developer & Programming Student
                            </p>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                                Building scalable backend systems and APIs with Go and Laravel.
                                Currently studying at vocational school while working on production systems,
                                competing in hackathons, and handling on-call engineering.
                            </p>
                            <div className="flex gap-4 text-sm">
                                <a href="#contact"
                                   className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition">
                                    Get in touch
                                </a>
                                <a href="#projects"
                                   className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition">
                                    View projects
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About / API Response Demo */}
                <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">About Me</h2>
                            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                <p>
                                    I&apos;m <strong className="text-zinc-900 dark:text-zinc-100">Fauzy Madani</strong>,
                                    a vocational school student
                                    specializing in backend development with a focus on building robust, scalable APIs
                                    and server-side systems.
                                </p>
                                <p>
                                    My technical expertise centers on <strong
                                    className="text-zinc-900 dark:text-zinc-100">Go</strong> and{' '}
                                    <strong className="text-zinc-900 dark:text-zinc-100">Laravel/PHP</strong>,
                                    complemented by experience with
                                    PostgreSQL, MariaDB, Docker, and cloud platforms (AWS/GCP). I&apos;m passionate
                                    about clean architecture,
                                    database optimization, and DevOps practices.
                                </p>
                                <p>
                                    Beyond school, I work as a backend developer and on-call engineer for a digital
                                    agency,
                                    where I maintain production systems and build APIs for clients. I&apos;ve also
                                    competed in hackathons,
                                    including building a hospital orchestration system for stroke cases.
                                </p>
                                <p>
                                    I believe in writing efficient, maintainable code and always strive to learn new
                                    patterns and technologies
                                    in backend development and distributed systems.
                                </p>
                            </div>
                        </div>

                        {/* Animated API Response Card */}
                        <div className="relative">
                            <div className="sticky top-8">
                                <div className="text-xs font-mono text-zinc-500 mb-2">GET /api/developer</div>
                                <div className="holo-card-wrapper">
                                    <div className="holo-behind"></div>
                                    <div className="holo-card-shell">
                                        <div className="holo-card" ref={cardRef}>
                                            <div className="holo-inside"></div>
                                            <div className="holo-shine"></div>
                                            <div className="holo-glare"></div>
                                            <div className="holo-content">
                                                <div className="space-y-1 relative z-10">
                                        <div className="flex">
                                            <span className="text-zinc-500">{'{'}</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                                            <span className="text-blue-400">&quot;name&quot;</span>
                                            <span className="text-zinc-500">: </span>
                                            <span className="text-yellow-300">&quot;Fauzy Madani&quot;</span>
                                            <span className="text-zinc-500">,</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                                            <span className="text-blue-400">&quot;role&quot;</span>
                                            <span className="text-zinc-500">: </span>
                                            <span className="text-yellow-300">&quot;Backend Developer&quot;</span>
                                            <span className="text-zinc-500">,</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
                                            <span className="text-blue-400">&quot;status&quot;</span>
                                            <span className="text-zinc-500">: </span>
                                            <span className="text-yellow-300">&quot;Student &amp; Engineer&quot;</span>
                                            <span className="text-zinc-500">,</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                                            <span className="text-blue-400">&quot;languages&quot;</span>
                                            <span className="text-zinc-500">: [</span>
                                        </div>
                                        <div className="pl-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                                            <span className="text-yellow-300">&quot;Go&quot;</span>
                                            <span className="text-zinc-500">, </span>
                                            <span className="text-yellow-300">&quot;PHP&quot;</span>
                                            <span className="text-zinc-500">, </span>
                                            <span className="text-yellow-300">&quot;JavaScript&quot;</span>
                                            <span className="text-zinc-500">, </span>
                                            <span className="text-yellow-300">&quot;SQL&quot;</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
                                            <span className="text-zinc-500">],</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '0.7s'}}>
                                            <span className="text-blue-400">&quot;specialties&quot;</span>
                                            <span className="text-zinc-500">: [</span>
                                        </div>
                                        <div className="pl-8 animate-fade-in" style={{animationDelay: '0.8s'}}>
                                            <span className="text-yellow-300">&quot;REST API Development&quot;</span>
                                            <span className="text-zinc-500">,</span>
                                        </div>
                                        <div className="pl-8 animate-fade-in" style={{animationDelay: '0.9s'}}>
                                            <span className="text-yellow-300">&quot;Database Design&quot;</span>
                                            <span className="text-zinc-500">,</span>
                                        </div>
                                        <div className="pl-8 animate-fade-in" style={{animationDelay: '1s'}}>
                                            <span className="text-yellow-300">&quot;Cloud Infrastructure&quot;</span>
                                            <span className="text-zinc-500">,</span>
                                        </div>
                                        <div className="pl-8 animate-fade-in" style={{animationDelay: '1.1s'}}>
                                            <span className="text-yellow-300">&quot;Microservices&quot;</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '1.2s'}}>
                                            <span className="text-zinc-500">],</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '1.3s'}}>
                                            <span className="text-blue-400">&quot;tools&quot;</span>
                                            <span className="text-zinc-500">: [</span>
                                        </div>
                                        <div className="pl-8 animate-fade-in" style={{animationDelay: '1.4s'}}>
                                            <span className="text-yellow-300">&quot;Docker&quot;</span>
                                            <span className="text-zinc-500">, </span>
                                            <span className="text-yellow-300">&quot;AWS&quot;</span>
                                            <span className="text-zinc-500">, </span>
                                            <span className="text-yellow-300">&quot;Postman&quot;</span>
                                            <span className="text-zinc-500">, </span>
                                            <span className="text-yellow-300">&quot;Terraform&quot;</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '1.5s'}}>
                                            <span className="text-zinc-500">],</span>
                                        </div>
                                        <div className="pl-4 animate-fade-in" style={{animationDelay: '1.6s'}}>
                                            <span className="text-blue-400">&quot;available&quot;</span>
                                            <span className="text-zinc-500">: </span>
                                            <span className="text-green-400">true</span>
                                        </div>
                                        <div className="flex animate-fade-in" style={{animationDelay: '1.7s'}}>
                                            <span className="text-zinc-500">{'}'}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-zinc-800 text-zinc-600 text-xs animate-fade-in relative z-10" style={{animationDelay: '1.8s'}}>
                                        <div className="flex items-center gap-2">
                                            <span>Status:</span>
                                            <span className="text-green-400">200 OK</span>
                                            <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>Response Time:</span>
                                            <span className="text-green-400">42ms</span>
                                        </div>
                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Work Experience */}
                <section id="work" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-12">Experience</h2>

                    <div className="space-y-12">
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold">Fullstack Developer & On-Call Engineer</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">Nempo Garut Project</p>
                                </div>
                                <span className="text-sm text-zinc-500 font-mono mt-1 md:mt-0">2025</span>
                            </div>
                            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-4">
                                <li>• Building and maintaining backend systems and RESTful APIs for agency clients</li>
                                <li>• Providing on-call engineering support for production systems and critical issues
                                </li>
                                <li>• Designing database schemas and optimizing queries for performance</li>
                            </ul>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Laravel/PHP</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">MariaDB</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold">Junior Backend Intern</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">PT. Sentosa Teknologi Gemilang</p>
                                </div>
                                <span
                                    className="text-sm text-zinc-500 font-mono mt-1 md:mt-0">July - November 2025</span>
                            </div>
                            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-4">
                                <li>• Gained hands-on experience in full-stack development and software engineering
                                    practices
                                </li>
                                <li>• Worked on real-world projects involving web and mobile application development
                                </li>
                                <li>• Collaborated with development teams on feature implementation and bug fixes</li>
                                <li>• Learned industry-standard workflows, version control, and deployment processes
                                </li>
                            </ul>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Go</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Laravel</span>
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Git</span>
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">AWS</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Terraform</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold">Student</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">Vocational School</p>
                                </div>
                                <span className="text-sm text-zinc-500 font-mono mt-1 md:mt-0">Present</span>
                            </div>
                            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-4">
                                <li>• Studying comprehensive programming curriculum covering web, mobile, and desktop
                                    development
                                </li>
                                <li>• Learning software engineering principles, algorithms, and data structures</li>
                                <li>• Participating in hackathons and competitive programming events</li>
                                <li>• Building portfolio projects to demonstrate technical skills</li>
                            </ul>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Web Development</span>
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Mobile Development</span>
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Desktop Development</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-12">Projects & Hackathons</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div
                            className="border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition">
                            <div className="text-xs font-mono text-zinc-500 mb-2">HACKATHON PROJECT</div>
                            <h3 className="font-bold text-lg mb-3">Hospital Orchestrator System for Stroke Cases -
                                Kemenkes</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                                Developed an orchestration system to streamline stroke patient care coordination in
                                hospitals.
                                The system manages patient flow, resource allocation, and emergency response protocols
                                for time-critical stroke treatment.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Healthcare Tech</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Orchestration</span>
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Real-time Systems</span>
                            </div>
                        </div>

                        <div
                            className="border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition">
                            <div className="text-xs font-mono text-zinc-500 mb-2">HACKATHON PROJECT</div>
                            <h3 className="font-bold text-lg mb-3">Hakita Project - OJK</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                                Participated in a second hackathon, building innovative solutions under time
                                constraints.
                                Collaborated with team members to develop, design, and present a working prototype.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Team Project</span>
                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Rapid Development</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Blockchain</span>
                            </div>
                        </div>

                        <div
                            className="border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition">
                            <div className="text-xs font-mono text-zinc-500 mb-2">AGENCY WORK</div>
                            <h3 className="font-bold text-lg mb-3">Admin Panel Systems</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                                Developed and maintained a system for admin and backend services for agency clients.
                                Handled database design, and on-call support for production systems.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Laravel</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">MariaDB</span>
                            </div>
                        </div>

                        <div
                            className="border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition">
                            <div className="text-xs font-mono text-zinc-500 mb-2">SCHOOL PROJECT</div>
                            <h3 className="font-bold text-lg mb-3">Desktop & Mobile Applications</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                                Built various desktop and mobile applications as part of vocational school curriculum.
                                Applied programming concepts across different platforms and technologies.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Desktop Apps</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Mobile Apps</span>
                                <span
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono">Cross-platform</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section id="stack" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-12">Technical Skills</h2>

                    {/* Skills Carousel */}
                    <div className="relative overflow-hidden py-8">
                        <div className="skills-carousel">
                            <div className="skills-track">
                                {/* First set */}
                                {skills.map((skill, index) => (
                                    <div key={`skill-1-${index}`} className="skill-item group">
                                        <Image
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={80}
                                            height={80}
                                            className="skill-logo"
                                            unoptimized
                                        />
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                ))}

                                {/* Duplicate set for seamless infinite scroll */}
                                {skills.map((skill, index) => (
                                    <div key={`skill-2-${index}`} className="skill-item group">
                                        <Image
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={80}
                                            height={80}
                                            className="skill-logo"
                                            unoptimized
                                        />
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-zinc-500">Currently Learning</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                            <div>• Advanced Go Patterns</div>
                            <div>• Microservices Architecture</div>
                            <div>• Kubernetes Orchestration</div>
                            <div>• Database Design & Optimization</div>
                            <div>• CI/CD Pipelines</div>
                            <div>• Cloud-Native Applications</div>
                            <div>• System Design & Scalability</div>
                            <div>• Message Queues & Event-Driven Systems</div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>

                    <div className="max-w-2xl">
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            Open to internship opportunities, freelance projects, and collaboration on interesting
                            development challenges. Always eager to learn and contribute to innovative solutions.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <span className="text-sm text-zinc-500 uppercase tracking-wide">Email</span>
                                <div><a href="mailto:fauzymadani3@gmail.com"
                                        className="text-lg hover:text-zinc-600 dark:hover:text-zinc-400 transition">fauzymadani3@gmail.com</a>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-zinc-500 uppercase tracking-wide">GitHub</span>
                                <div><a href="https://github.com/fauzymadani" target="_blank" rel="noopener noreferrer"
                                        className="text-lg hover:text-zinc-600 dark:hover:text-zinc-400 transition">github.com/fauzymadani</a>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-zinc-500 uppercase tracking-wide">LinkedIn</span>
                                <div><a href="https://www.linkedin.com/in/fauzy-madani-2a4b24388/" target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg hover:text-zinc-600 dark:hover:text-zinc-400 transition">linkedin.com/in/fauzy-madani-2a4b24388</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
                <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-zinc-500">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>{new Date().getFullYear()} Fauzy Madani</div>
                        <div>Built with Next.js, TypeScript & Tailwind CSS</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

