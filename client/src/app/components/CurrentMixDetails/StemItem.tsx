import { Stem } from '@/api/types';

export default function StemItem({ stem }: { stem: Stem }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div
        className="w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: 'grey' }}
      />
      <p className="text-white font-medium">{stem.title}</p>
    </div>
  );
}
