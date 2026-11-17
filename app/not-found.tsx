import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="caption-3 uppercase tracking-widest text-[#666666]">
          Error 404
        </span>
        <h1 className="heading-3 text-[#181818]">
          This territory is unexplored
        </h1>
        <p className="body-3 text-[#575753]">
          The route you requested could not be located on our map. Let us guide you back to familiar grounds.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#181818] text-white rounded-full button-md hover:bg-black transition-colors"
          >
            Return to Oereo Home
          </Link>
        </div>
      </div>
    </main>
  );
}
