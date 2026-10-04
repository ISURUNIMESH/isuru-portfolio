import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
      <p className="kicker">404</p>
      <h1 className="display display-page mt-4 text-text">Page not found.</h1>
      <p className="mt-5 max-w-md text-muted">
        We couldn&apos;t find that page. Try the project collection or head back home.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit rounded-xl border border-cyan bg-cyan px-5 py-3 text-sm font-medium text-white transition hover:bg-[#7055b6]"
      >
        Go home
      </Link>
    </main>
  );
}
