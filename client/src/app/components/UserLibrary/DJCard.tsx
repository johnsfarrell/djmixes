import Image from 'next/image';
import { User as DJ } from '@/api/types';
import { User } from 'lucide-react';

export default function DJCard({ dj }: { dj: DJ }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square mb-2 relative">
        { dj.profilePhoto ? (
          <Image
            src={dj.profilePhoto}
            alt={`${dj.name} profile photo`}
            fill
            className="object-cover rounded-md transition-transform group-hover:scale-105"
          />
        ) : (
          // default user avatar 
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="text-white font-medium text-center truncate">{dj.name}</h3>
    </div>
  );
}
