import Link from 'next/link';

export default function Logo() {
    return (
      <Link
        href="/"
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-white rounded-full" />
        <span className="text-white text-xl font-semibold hidden sm:block">DJMix</span>
      </Link>
    );
  }