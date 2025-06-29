import { signInSchema, SignInSchema } from '@ig-clone/schema';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { Loader2Icon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { authCookie } from '~/lib/auth';
import { trpc } from '~/lib/trpc';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Partial<SignInSchema>;

  const result = signInSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  try {
    const response = await trpc.auth.signIn.mutate({
      email: result.data.email,
      password: result.data.password,
    });

    if (response?.token) {
      return redirect('/', {
        headers: {
          'Set-Cookie': await authCookie.serialize(response.token),
        },
      });
    }

    return { error: 'Unknown error occurred.' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error?.message || 'Something went wrong. Please try again later.';

    return { error: message };
  }
};

export default function SignInPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="min-w-xl">
        <CardHeader>
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Sign In
          </h1>
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Please sign in to continue.
          </p>
        </CardHeader>
        <CardContent>
          {actionData?.error && (
            <p className="leading-6 text-red-500 dark:text-gray-200">
              {actionData.error}
            </p>
          )}
          <Form method="post" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <Button type="submit">
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
