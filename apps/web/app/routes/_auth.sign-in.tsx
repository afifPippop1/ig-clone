import { signInSchema, SignInSchema } from '@ig-clone/database';
import { ActionFunctionArgs } from '@remix-run/node';
import {
  data,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from '@remix-run/react';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { authCookie } from '~/lib/auth';
import { makeTRPC } from '~/lib/trpc';

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form) as Partial<SignInSchema>;

  const result = signInSchema.safeParse(formData);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  try {
    const trpc = makeTRPC();
    const response = await trpc.auth.signIn.mutate({
      email: result.data.email,
      password: result.data.password,
    });

    if (response?.token) {
      return data(
        { error: null },
        {
          headers: {
            'Set-Cookie': await authCookie.serialize(response.token),
          },
        },
      );
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSubmitting && actionData?.error === null) {
      window.location.href = '/';
    }
  }, [actionData?.error, isSubmitting]);

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
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <Button type="submit" className="cursor-pointer">
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
          <p className="text-center">or</p>
          <Button
            onClick={() => {
              navigate('/sign-up');
            }}
            variant="outline"
            className="w-full cursor-pointer"
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
