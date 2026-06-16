import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="text-2xl font-bold text-brand-navy">
              Car<span className="text-brand-orange">Soup</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold text-brand-navy mt-4 mb-1">
            Welcome back
          </h1>
          <p className="text-gray-600 text-sm">
            Sign in to access your Car Concierge account.
          </p>
        </div>

        <div className="card p-8">
          <LoginForm
            next={params.next}
            error={params.error}
          />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href={`/signup${params.next ? `?next=${params.next}` : ""}`}
            className="text-brand-orange font-semibold hover:underline"
          >
            Create one free
          </a>
        </p>
      </div>
    </div>
  );
}
