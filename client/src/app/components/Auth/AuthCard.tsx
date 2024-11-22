import Logo from '../Logo';

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
  }
  
  export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
  
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 w-full">
            <div className="text-center mb-6">
              <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
              {subtitle && (
                <p className="text-gray-400">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
  