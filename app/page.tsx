'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import GitHubActivity from '@/components/GitHubActivity';

export default function Home() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    // Only render particles after component mounts (client-side only)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate particles once after mount - memoized to avoid regeneration
    const particles = useMemo(() => {
        if (!mounted) return [];
        // Generate random particles on client-side only to avoid hydration mismatch
        /* eslint-disable react-hooks/purity */
        return Array.from({ length: 20 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10
        }));
        /* eslint-enable react-hooks/purity */
    }, [mounted]);

    // Skills data for the carousel
    const skills = [
        {name: 'Go', icon: '/icons/go.svg'},
        {name: 'PHP', icon: '/icons/php.svg'},
        {name: 'Laravel', icon: '/icons/laravel.svg'},
        {name: 'JavaScript', icon: '/icons/javascript.svg'},
        {name: 'PostgreSQL', icon: '/icons/postgresql.svg'},
        {name: 'MariaDB', icon: '/icons/mysql.svg'},
        {name: 'Redis', icon: '/icons/redis.svg'},
        {name: 'Docker', icon: '/icons/docker.svg'},
        {name: 'AWS', icon: '/icons/aws.svg'},
        {name: 'GCP', icon: '/icons/gcp.svg'},
        {name: 'Terraform', icon: '/icons/terraform.svg'},
        {name: 'Git', icon: '/icons/git.svg'},
        {name: 'Linux', icon: '/icons/linux.svg'},
        {name: 'Kubernetes', icon: '/icons/kubernetes.svg'},
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

    // Track mouse position for interactive background
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 relative overflow-hidden">
            {/* Floating particles background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-float"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Interactive gradient that follows mouse */}
            <div
                className="fixed inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 100, 0.05), transparent 80%)`,
                }}
            />

            {/* Navigation */}
            <nav className="border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-sm bg-white/80 dark:bg-zinc-950/80 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="font-mono text-sm font-bold hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-pointer">fauzy-dev.vercel.app</span>
                    <div className="flex gap-6 text-sm">
                        <a href="#work" className="relative hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-zinc-900 dark:after:bg-zinc-100 after:transition-all hover:after:w-full">Work</a>
                        <a href="#projects" className="relative hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-zinc-900 dark:after:bg-zinc-100 after:transition-all hover:after:w-full">Projects</a>
                        <a href="#stack" className="relative hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-zinc-900 dark:after:bg-zinc-100 after:transition-all hover:after:w-full">Stack</a>
                        <a href="#contact" className="relative hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-zinc-900 dark:after:bg-zinc-100 after:transition-all hover:after:w-full">Contact</a>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6">
                {/* Hero */}
                <section className="py-24 md:py-32">
                    <div className="max-w-5xl flex flex-col md:flex-row items-center gap-12">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0 relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 animate-pulse" />
                            <div className="relative">
                                <Image
                                    src="/icons/me.png"
                                    alt="Fauzy Madani"
                                    width={200}
                                    height={200}
                                    className="w-32 h-32 md:w-48 md:h-48 object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 hover:rotate-3"
                                    priority
                                />
                            </div>
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
                                   className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                                    Get in touch
                                </a>
                                <a href="#projects"
                                   className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95">
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
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '0.1s'}}>
                                                        <span className="text-blue-400">&quot;name&quot;</span>
                                                        <span className="text-zinc-500">: </span>
                                                        <span
                                                            className="text-yellow-300">&quot;Fauzy Madani&quot;</span>
                                                        <span className="text-zinc-500">,</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '0.2s'}}>
                                                        <span className="text-blue-400">&quot;role&quot;</span>
                                                        <span className="text-zinc-500">: </span>
                                                        <span
                                                            className="text-yellow-300">&quot;Backend Developer&quot;</span>
                                                        <span className="text-zinc-500">,</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '0.3s'}}>
                                                        <span className="text-blue-400">&quot;status&quot;</span>
                                                        <span className="text-zinc-500">: </span>
                                                        <span
                                                            className="text-yellow-300">&quot;Student &amp; Engineer&quot;</span>
                                                        <span className="text-zinc-500">,</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '0.4s'}}>
                                                        <span className="text-blue-400">&quot;languages&quot;</span>
                                                        <span className="text-zinc-500">: [</span>
                                                    </div>
                                                    <div className="pl-8 animate-fade-in"
                                                         style={{animationDelay: '0.5s'}}>
                                                        <span className="text-yellow-300">&quot;Go&quot;</span>
                                                        <span className="text-zinc-500">, </span>
                                                        <span className="text-yellow-300">&quot;PHP&quot;</span>
                                                        <span className="text-zinc-500">, </span>
                                                        <span className="text-yellow-300">&quot;JavaScript&quot;</span>
                                                        <span className="text-zinc-500">, </span>
                                                        <span className="text-yellow-300">&quot;SQL&quot;</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '0.6s'}}>
                                                        <span className="text-zinc-500">],</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '0.7s'}}>
                                                        <span className="text-blue-400">&quot;specialties&quot;</span>
                                                        <span className="text-zinc-500">: [</span>
                                                    </div>
                                                    <div className="pl-8 animate-fade-in"
                                                         style={{animationDelay: '0.8s'}}>
                                                        <span
                                                            className="text-yellow-300">&quot;REST API Development&quot;</span>
                                                        <span className="text-zinc-500">,</span>
                                                    </div>
                                                    <div className="pl-8 animate-fade-in"
                                                         style={{animationDelay: '0.9s'}}>
                                                        <span
                                                            className="text-yellow-300">&quot;Database Design&quot;</span>
                                                        <span className="text-zinc-500">,</span>
                                                    </div>
                                                    <div className="pl-8 animate-fade-in"
                                                         style={{animationDelay: '1s'}}>
                                                        <span
                                                            className="text-yellow-300">&quot;Cloud Infrastructure&quot;</span>
                                                        <span className="text-zinc-500">,</span>
                                                    </div>
                                                    <div className="pl-8 animate-fade-in"
                                                         style={{animationDelay: '1.1s'}}>
                                                        <span
                                                            className="text-yellow-300">&quot;Microservices&quot;</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '1.2s'}}>
                                                        <span className="text-zinc-500">],</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '1.3s'}}>
                                                        <span className="text-blue-400">&quot;tools&quot;</span>
                                                        <span className="text-zinc-500">: [</span>
                                                    </div>
                                                    <div className="pl-8 animate-fade-in"
                                                         style={{animationDelay: '1.4s'}}>
                                                        <span className="text-yellow-300">&quot;Docker&quot;</span>
                                                        <span className="text-zinc-500">, </span>
                                                        <span className="text-yellow-300">&quot;AWS&quot;</span>
                                                        <span className="text-zinc-500">, </span>
                                                        <span className="text-yellow-300">&quot;Postman&quot;</span>
                                                        <span className="text-zinc-500">, </span>
                                                        <span className="text-yellow-300">&quot;Terraform&quot;</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '1.5s'}}>
                                                        <span className="text-zinc-500">],</span>
                                                    </div>
                                                    <div className="pl-4 animate-fade-in"
                                                         style={{animationDelay: '1.6s'}}>
                                                        <span className="text-blue-400">&quot;available&quot;</span>
                                                        <span className="text-zinc-500">: </span>
                                                        <span className="text-green-400">true</span>
                                                    </div>
                                                    <div className="flex animate-fade-in"
                                                         style={{animationDelay: '1.7s'}}>
                                                        <span className="text-zinc-500">{'}'}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="mt-4 pt-4 border-t border-zinc-800 text-zinc-600 text-xs animate-fade-in relative z-10"
                                                    style={{animationDelay: '1.8s'}}>
                                                    <div className="flex items-center gap-2">
                                                        <span>Status:</span>
                                                        <span className="text-green-400">200 OK</span>
                                                        <span
                                                            className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
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

                {/* What I Can Deliver */}
                <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-4">What I Can Deliver</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl">
                        As a backend developer, I focus on building systems that are reliable, scalable, and maintainable.
                        Here&apos;s what I bring to the table:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="group p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">RESTful API Development</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        Building scalable, well-documented APIs with proper authentication, rate limiting, and error handling.
                                        Experience with Go, Laravel/PHP, and modern API design patterns.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">Database Design & Optimization</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        Designing efficient database schemas, writing optimized queries, and implementing proper indexing.
                                        Proficient with PostgreSQL, MariaDB, and Redis for caching.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">DevOps & Deployment</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        Containerizing applications with Docker, infrastructure as code with Terraform, and deploying to AWS/GCP.
                                        Setting up CI/CD pipelines for automated testing and deployment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">System Reliability & Monitoring</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        Implementing logging, monitoring, and alerting for production systems.
                                        Experience with on-call engineering and debugging critical issues under pressure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience */}
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

                {/* Impact & Metrics */}
                <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-12">Impact & Metrics</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">500+</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">Commits This Year</div>
                            </div>
                        </div>

                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">99.9%</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">API Uptime</div>
                            </div>
                        </div>

                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">2</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">Hackathon Wins</div>
                            </div>
                        </div>

                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">&lt;100ms</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">Avg Response Time</div>
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

                    <div className="mt-12 p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-zinc-900 dark:bg-zinc-100 rounded">
                                <svg className="w-5 h-5 text-zinc-100 dark:text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg">Currently Learning & Improving</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: 'Advanced Go Patterns', level: 70 },
                                { name: 'Microservices Architecture', level: 60 },
                                { name: 'Kubernetes Orchestration', level: 50 },
                                { name: 'Database Optimization', level: 75 },
                                { name: 'CI/CD Pipelines', level: 65 },
                                { name: 'Cloud-Native Apps', level: 60 },
                                { name: 'System Design', level: 55 },
                                { name: 'Event-Driven Systems', level: 45 }
                            ].map((skill, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <span className="text-xs text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full transition-all duration-1000 ease-out group-hover:scale-x-105"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400 italic">
                            🚀 Constantly learning through courses, documentation, and hands-on projects
                        </p>
                    </div>
                </section>

                {/* Certifications & Achievements */}
                <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold mb-12">Certifications & Achievements</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded">
                                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Hackathon Winner - Kemenkes</h3>
                                            <p className="text-sm text-zinc-500">AI Healthcare Hackathon</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Built hospital orchestration system for stroke cases, streamlining patient care coordination.
                                </p>
                            </div>
                        </div>

                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded">
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Hackathon Participant - OJK</h3>
                                            <p className="text-sm text-zinc-500">Infinity Hacakthon 2025</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Developed fintech solution collaborating with team under time constraints.
                                </p>
                            </div>
                        </div>

                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded">
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Production System Maintenance</h3>
                                            <p className="text-sm text-zinc-500">99.9% Uptime Achievement</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Maintained high availability for client APIs and backend systems with on-call support.
                                </p>
                            </div>
                        </div>

                        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded">
                                            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Vocational School Student</h3>
                                            <p className="text-sm text-zinc-500">Software Engineering Program</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Comprehensive programming curriculum covering web, mobile, and desktop development.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 opacity-50" />
                        <div className="relative max-w-3xl mx-auto text-center py-16 px-6">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Let&apos;s Build Something Great Together
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                                I&apos;m actively seeking opportunities to contribute to challenging projects, learn from experienced teams,
                                and grow as a backend developer. Whether it&apos;s an internship, freelance project, or full-time position,
                                I&apos;m ready to bring value from day one.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 rounded-lg"
                                >
                                    Get In Touch
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/fauzymadani"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95 rounded-lg font-semibold"
                                >
                                    View GitHub
                                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span>Available for opportunities</span>
                                </div>
                                <div className="hidden sm:block">•</div>
                                <span className="hidden sm:inline">Response within 24h</span>
                            </div>
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

                {/* GitHub Activity */}
                <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Recent GitHub Activity</h2>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Live feed from my repositories</p>
                            </div>
                            <a
                                href="https://github.com/fauzymadani"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition rounded-lg text-sm font-medium"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                View Profile
                            </a>
                        </div>
                        <GitHubActivity />
                        <div className="mt-6 sm:hidden">
                            <a
                                href="https://github.com/fauzymadani"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition rounded-lg text-sm font-medium w-full"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                View Full GitHub Profile
                            </a>
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

