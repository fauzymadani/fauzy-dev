'use client';

import { useEffect, useState } from 'react';

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: Array<{ message: string }>;
    action?: string;
    ref_type?: string;
  };
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/fauzymadani/events/public?per_page=5')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'CreateEvent':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'PullRequestEvent':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'IssuesEvent':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return 'text-green-500';
      case 'CreateEvent':
        return 'text-blue-500';
      case 'PullRequestEvent':
        return 'text-purple-500';
      case 'IssuesEvent':
        return 'text-orange-500';
      default:
        return 'text-zinc-500';
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    const repoName = event.repo.name.split('/')[1] || event.repo.name;
    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload?.commits?.length || 0;
        return {
          action: 'Pushed',
          detail: `${commitCount} commit${commitCount > 1 ? 's' : ''}`,
          repo: repoName
        };
      case 'CreateEvent':
        return {
          action: 'Created',
          detail: event.payload?.ref_type || 'repository',
          repo: repoName
        };
      case 'PullRequestEvent':
        return {
          action: event.payload?.action || 'Updated',
          detail: 'pull request',
          repo: repoName
        };
      case 'IssuesEvent':
        return {
          action: event.payload?.action || 'Updated',
          detail: 'issue',
          repo: repoName
        };
      default:
        return {
          action: 'Activity in',
          detail: '',
          repo: repoName
        };
    }
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="relative h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 animate-pulse rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event, index) => {
        const desc = getEventDescription(event);
        return (
          <div
            key={event.id}
            className="github-activity-card group relative p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/10 dark:hover:shadow-zinc-950/50 hover:-translate-y-2 bg-white dark:bg-zinc-950 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-zinc-100/50 to-transparent dark:from-zinc-900/50 dark:via-zinc-800/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative flex items-start gap-4">
              <div className={`${getEventColor(event.type)} flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 group-hover:bg-white dark:group-hover:bg-zinc-800 group-hover:shadow-lg`}>
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">
                      {desc.action}
                    </span>
                    {desc.detail && (
                      <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                        {desc.detail}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono whitespace-nowrap px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors">
                    {getTimeAgo(event.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs group-hover:gap-3 transition-all">
                  <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                  </svg>
                  <span className="text-zinc-600 dark:text-zinc-400 font-mono truncate group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors font-semibold">
                    {desc.repo}
                  </span>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}

