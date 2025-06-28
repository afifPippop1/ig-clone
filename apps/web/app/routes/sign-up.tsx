import { signUpSchema, SignUpSchema } from '@ig-clone/schema';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect, useActionData, useNavigation } from '@remix-run/react';
import { Loader2Icon } from 'lucide-react';
import { Birthdate } from '~/components/shared/birthdate';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { trpc } from '~/lib/trpc';

const AlreadyExistsMessage = ' already exists';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Partial<SignUpSchema>;

    const result = signUpSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return { errors };
    }

    const { email, password, birthdate, confirm, name, username } = result.data;
    const response = await trpc.auth.signUp.mutate({
      email,
      password,
      confirm,
      birthdate,
      name,
      username,
    });

    if (response.ok) {
      return redirect('/sign-in');
    }

    return { error: 'Unknown error occurred.' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      (error?.message as string) ||
      'Something went wrong. Please try again later.';

    if (message.includes(AlreadyExistsMessage)) {
      const [fieldsStr] = message.split(AlreadyExistsMessage);
      const fields = fieldsStr.split(' ,');
      const fieldsMessage = fields.reduce(
        (acc, value) => ({
          ...acc,
          [value]: `${value}${AlreadyExistsMessage}`.replace(/^./, (c) =>
            c.toUpperCase(),
          ),
        }),
        {} as Record<keyof SignUpSchema, string>,
      );
      return { errors: fieldsMessage };
    }
    return { error: message };
  }
};

export default function SignUpPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Get started on Instagram
          </h1>
          <p>Sign up to see photos and videos from your friends.</p>
        </header>
        <Card className="min-w-xl">
          <CardContent>
            {actionData?.error && (
              <p className="text-sm text-red-500">{actionData.error}</p>
            )}
            <Form method="post" className="space-y-8">
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input placeholder="your-email@address.com" name="email" />
                {actionData?.errors?.email && (
                  <p className="text-sm text-red-500">
                    <span>{actionData.errors.email}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input name="password" type="password" placeholder="••••••••" />
                {actionData?.errors?.password && (
                  <p className="text-sm text-red-500">
                    <span>{actionData.errors.password}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="••••••••" name="confirm" />
                {actionData?.errors?.confirm && (
                  <p className="text-sm text-red-500">
                    <span>{actionData.errors.confirm}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Birthday</Label>
                <Birthdate />
                {actionData?.errors?.birthdate && (
                  <p className="text-sm text-red-500">
                    <span>{actionData.errors.birthdate}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Fullname</Label>
                <Input type="text" placeholder="Fullname" name="name" />
                {actionData?.errors?.name && (
                  <p className="text-sm text-red-500">
                    <span>{actionData.errors.name}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input type="text" placeholder="Username" name="username" />
                {actionData?.errors?.username && (
                  <p className="text-sm text-red-500">
                    <span>{actionData.errors.username}</span>
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
