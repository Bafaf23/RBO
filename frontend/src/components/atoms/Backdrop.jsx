export default function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs -z-50 transition-opacity animate-fade-in"
    />
  );
}
