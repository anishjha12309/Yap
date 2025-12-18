const COLORS = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", 
  "bg-yellow-500", "bg-lime-500", "bg-green-500", 
  "bg-emerald-500", "bg-teal-500", "bg-cyan-500", 
  "bg-sky-500", "bg-blue-500", "bg-indigo-500", 
  "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", 
  "bg-pink-500", "bg-rose-500"
];

const getColorFromName = (name: string = ""): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

const getInitials = (name: string = ""): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ src, alt = "User", size = "md", className = "", onClick }: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };
  
  const widthHeight = typeof size === 'number' ? { width: size, height: size } : {};
  const sizeClass = typeof size === 'string' ? sizeClasses[size] : '';
  const bgColor = getColorFromName(alt);

  // Check if src is valid (not empty and not the default-api-url if we want to replace it entirely, 
  // but for now let's just assume empty src means use initials)
  // Also check if src contains "avatar.iran.liara.run" to override legacy avatars if desired, 
  // but let's stick to "if src provided, use it".
  const hasValidImage = src && src.length > 0;

  return (
    <div 
      className={`rounded-full overflow-hidden flex items-center justify-center font-semibold text-white select-none ${sizeClass} ${hasValidImage ? '' : bgColor} ${className}`}
      style={widthHeight}
      onClick={onClick}
    >
      {hasValidImage ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <span>{getInitials(alt)}</span>
      )}
    </div>
  );
};

export default Avatar;
