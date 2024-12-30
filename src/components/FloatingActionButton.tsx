import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  position: { x: number; y: number } | null;
  onClick: () => void;
  visible: boolean;
}

export const FloatingActionButton = ({
  position,
  onClick,
  visible,
}: FloatingActionButtonProps) => {
  if (!position || !visible) return null;

  return (
    <button
      className={cn(
        "fixed z-50 p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm",
        "hover:bg-white/95 transition-all duration-200 animate-fade-in",
        "border border-gray-200/50"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
      onClick={onClick}
    >
      <MessageCircle className="w-5 h-5 text-gray-700" />
    </button>
  );
};