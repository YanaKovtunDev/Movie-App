import { createNextRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';

export const { POST } = createNextRouteHandler({
  router: ourFileRouter,
});
