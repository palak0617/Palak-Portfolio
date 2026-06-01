'use client';

interface ChapterLayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ChapterLayout({ children, className = '', id }: ChapterLayoutProps) {
  return (
    <div id={id} className={`chapter-page-bg relative w-full min-h-full px-10 pt-8 pb-8 ${className}`}
      style={{ transition:'background 0.4s ease' }}>
      {/* Binding shadow */}
      <div className="absolute left-0 inset-y-0 pointer-events-none" style={{
        width:'32px',
        background:'linear-gradient(to right, var(--border-soft), transparent)',
      }}/>
      {children}
    </div>
  );
}
