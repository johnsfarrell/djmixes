import { forwardRef } from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-white text-sm mb-2">{label}</label>
        <input
          ref={ref}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700 focus:ring-gray-600'
          }`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = 'Input';
export default AuthInput;
