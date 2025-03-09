/**
 * `is-owner` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In is-owner middleware.');

    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.documentId;

    if (!userId) return ctx.unauthorized(`You can't access this entry`);

    const apiName = ctx.state.route.info.apiName;

    function generateUID(apiName) {
      const apiUid = `api::${apiName}.${apiName}`;
      return apiUid;
    }

    const appUid = generateUID(apiName);

    /**
     * If entryId exists, that means we are calling the findOne route.
     * In this case, we search for the entry and check if the
     * userId is the same as the logged-in user. If that is the case,
     * go ahead and return the entry.
     */
    if (entryId) {
      const entry = await strapi.documents(appUid as any).findOne({
        documentId: entryId,
        populate: '*',
      });

      if (entry && entry.authorId !== userId)
        return ctx.unauthorized(`You can't access this entry`);
    }

    /**
     * If there is no entryId, we assume
     * that we are making a GET request,
     * in which case filter the content by userId.
     */
    if (!entryId) {
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, authorId: userId },
      };
    }

    await next();
  };
};
