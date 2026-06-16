import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false, follow: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; intent?: string }>;
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
            Start free
          </h1>
          <p className="text-gray-600 text-sm">
            Create your account to access the AI assistant and buyer&apos;s guide.
            No credit card required.
          </p>
        </div>

        <div className="card p-8">
          <SignupForm next={params.next} intent={params.intent} />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href={`/login${params.next ? `?next=${params.next}` : ""}`}
            className="text-brand-orange font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
