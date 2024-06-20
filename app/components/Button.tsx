export default function Button({
  children,
  onClick,
  className,
  loading = false,
}: Readonly<{
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}>) {
  return (
    <button
      onClick={onClick}
      className={className + " bg-blue-400 hover:bg-blue-600 text-white font-bold py-3.5 px-10 rounded-lg text-sm transition-all ease-linear duration-300"}
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}