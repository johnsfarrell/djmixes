interface StemItemProps {
  stemName: string;
  file?: File;
}

export default function StemItem({ stemName, file }: StemItemProps) {
  // TODO: allow download file (or play file)
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div
        className="w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: 'grey' }}
      />
      <p className="text-white font-medium">{stemName}</p>
    </div>
  );
}
