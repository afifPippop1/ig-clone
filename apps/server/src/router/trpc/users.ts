import { authenticatedProcedure, router } from '~/config/trpc';

export const usersRouter = router({
  list: authenticatedProcedure.query(() => {
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];
  }),
});
