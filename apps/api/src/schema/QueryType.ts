import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import * as PostLoader from '../modules/post/PostLoader';
import { PostConnection } from '@/modules/post/PostType';
import { connectionArgs } from 'graphql-relay';
import PostModel from '@/modules/post/PostModel';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    me: {
      type: UserType,
      resolve: async (_root, _args, context) => {
        const user = await UserLoader.load(context, context.user?._id);
        const lastPost = await PostModel.findOne({ author: context.user?._id })
          .sort({ createdAt: -1 })
          .select('createdAt');

        return {
          ...user,
          lastPostDate: lastPost?.createdAt
            ? // guarentee that the date is in UTC
              new Date(lastPost.createdAt.toUTCString()).toISOString()
            : null,
        };
      },
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        await PostLoader.loadAll(context, args),
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => '1.0.0',
    },
  }),
});

export default QueryType;
