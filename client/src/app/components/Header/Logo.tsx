import Link from 'next/link';
import { Disc } from 'lucide-react';

export default function Logo() {
    return (
      <Link
        href="/"
        className="flex items-center gap-2"
      >
        <Disc size={24} className="text-white" />
        <span className="text-white text-xl font-semibold hidden sm:block">DJMix</span>
      </Link>
    );
  }