import { Input } from '~/components/ui/input';

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Sign Up
          </h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Please sign up to continue.
          </p>
          <form method="post" className="flex flex-col gap-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        </nav>
      </div>
    </div>
  );
}
