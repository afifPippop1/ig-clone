import { authenticatedProcedure, router } from '~/lib/trpc';

export const usersRouter = router({
  list: authenticatedProcedure.query(() => {
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];
  }),
});
