import { subscriptionWithClientId } from 'graphql-relay-subscription';

import PostType from '../PostType';
import * as PostLoader from '../PostLoader';
import { GraphQLContext } from '../../../graphql/types';

import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  POST: {
    NEW: 'POST_NEW',
  },
};

export const pubSub = new PubSub();

type PostNew = {
  postId: string;
};
const PostNewSubscription = subscriptionWithClientId<PostNew, GraphQLContext>({
  name: 'PostNew',
  inputFields: {},
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }: any, _, context) =>
        await PostLoader.load(context, id),
    },
  },
  subscribe: (_input, _context) => {
    return pubSub.asyncIterator(EVENTS.POST.NEW);
  },
  getPayload: (obj: PostNew) => {
    return {
      id: obj.postId,
    };
  },
});

export default PostNewSubscription;
