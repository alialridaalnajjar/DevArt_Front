export default function Horizontal({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}
