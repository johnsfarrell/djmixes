import Image from 'next/image';
import { User } from '@/types';

export default function DJCard({ dj }: { dj: User }) {
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
          <div className="bg-gray-700 w-full h-full" />
        )}
      </div>
      <h3 className="text-white font-medium text-center truncate">{dj.name}</h3>
    </div>
  );
}
