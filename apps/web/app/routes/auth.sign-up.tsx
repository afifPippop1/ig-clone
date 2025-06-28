import { signUpSchema, SignUpSchema } from '@ig-clone/schema';
import { ActionFunctionArgs } from '@remix-run/node';
import { redirect, useFetcher } from '@remix-run/react';
import { Loader2Icon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { trpc } from '~/lib/trpc';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Partial<SignUpSchema>;

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  try {
    const response = await trpc.auth.signUp.mutate({
      email: result.data.email,
      password: result.data.password,
    });

    if (response.ok) {
      return redirect('/auth/sign-in');
    }

    return { error: 'Unknown error occurred.' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error?.message || 'Something went wrong. Please try again later.';

    if (message === 'Email already exists') {
      return { errors: { email: message as string[] } };
    }
    return { error: message };
  }
};

export default function SignUpPage() {
  const fetcher = useFetcher<typeof action>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Sign Up
          </h1>
        </header>
        <Card>
          <CardContent>
            <p className="leading-6 text-gray-700 dark:text-gray-200">
              Please sign up to continue.
            </p>

            {fetcher.data?.error && (
              <p className="text-sm text-red-500">{fetcher.data.error}</p>
            )}
            <fetcher.Form method="post" className="space-y-8">
              <Label>Email</Label>
              <Input placeholder="your-email@address.com" name="email" />
              {fetcher.data?.errors?.email && (
                <p className="text-sm text-red-500">
                  <span>{fetcher.data.errors.email}</span>
                </p>
              )}
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="••••••••" />
              {fetcher.data?.errors?.password && (
                <p className="text-sm text-red-500">
                  <span>{fetcher.data.errors.password}</span>
                </p>
              )}
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="••••••••" name="confirm" />
              {fetcher.data?.errors?.confirm && (
                <p className="text-sm text-red-500">
                  <span>{fetcher.data.errors.confirm}</span>
                </p>
              )}
              <Button type="submit">
                {fetcher.state === 'submitting' ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </fetcher.Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
