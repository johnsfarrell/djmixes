interface StemItemProps {
  stemName: string;
  file?: File;
}

export default function StemItem({ stemName, file }: StemItemProps) {
  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
      <div
        className="w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: "grey" }}
      />
      <p className="text-white font-medium">{stemName}</p>
      <button onClick={handleDownload}>
        <i>(Download)</i>
      </button>
    </div>
  );
}
