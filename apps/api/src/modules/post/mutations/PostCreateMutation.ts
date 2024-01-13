import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import PostModel from '../PostModel';

import * as PostLoader from '../PostLoader';
import { PostConnection } from '../PostType';

import { GraphQLContext } from '../../../graphql/types';
import { EVENTS, pubSub } from '../subscriptions/PostNewSubscription';

const mutation = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {},
  mutateAndGetPayload: async (_, context: GraphQLContext) => {
    const post = await new PostModel({
      author: context.user!._id,
    }).save();

    await pubSub.publish(EVENTS.POST.NEW, { postId: post._id });

    return {
      id: post._id,
    };
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const post = await PostLoader.load(context, id);

        const lastPost = await PostModel.findOne({ author: context.user?._id })
          .sort({ createdAt: -1 })
          .select('createdAt');

        const currentDate = new Date();
        const oneHourEarlier = currentDate.getTime() - 60 * 60 * 1000;

        if (
          lastPost?.createdAt &&
          lastPost.createdAt > new Date(oneHourEarlier)
        ) {
          throw new Error('You can only create one post per hour');
        }

        // Returns null if no node was loaded
        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        };
      },
    },
  },
});

export default mutation;
