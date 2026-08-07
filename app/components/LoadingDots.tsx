type LoadingDotsProps = {
  label: string;
  className?: string;
};

export default function LoadingDots({
  label,
  className = "",
}: LoadingDotsProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      {label ? (
        <p className="text-center text-sm font-semibold tracking-[0.08em] text-[#1A1B1C] uppercase sm:text-base">
          {label}
        </p>
      ) : null}
      <div
        className="flex items-center justify-center space-x-4 py-2"
        aria-hidden
      >
        <span
          className="h-2 w-2 rounded-full bg-[#1A1B1C] animate-bounce-dot"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-2 w-2 rounded-full bg-[#1A1B1C] animate-bounce-dot"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-2 w-2 rounded-full bg-[#1A1B1C] animate-bounce-dot"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
