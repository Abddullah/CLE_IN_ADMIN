// Button.tsx
interface ButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
  }
  
  export const Button = ({ onClick, className, children }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 font-semibold rounded-md transition-all ${className}`}
      >
        {children}
      </button>
    );
  };
  