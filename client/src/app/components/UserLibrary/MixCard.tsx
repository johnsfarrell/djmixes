import Image from 'next/image';
import { Mix } from '@/api/types';

export default function MixCard({ mix }: { mix: Mix }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square mb-2 relative rounded-md overflow-hidden">
        {mix.artwork ? (
          <Image
            src={mix.artwork}
            alt={`${mix.title} artwork`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="bg-gray-700 w-full h-full" />
        )}
      </div>
      <h3 className="text-white font-medium truncate">{mix.title}</h3>
      <p className="text-gray-400 text-sm truncate">{mix.dj.name}</p>
    </div>
  );
}
