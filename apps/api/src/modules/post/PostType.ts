import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import {
  DataLoaderKey,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';

import LikeModel from '../like/LikeModel';

import { IPost } from './PostModel';
import { load } from './PostLoader';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...objectIdResolver,
    author: {
      type: UserType,
      resolve: (post, _, context) =>
        UserLoader.load(context, post.author as unknown as DataLoaderKey),
    },
    likesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (post) => LikeModel.countDocuments({ post: post._id }),
    },
    meHasLiked: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'whether logged user liked this post',
      resolve: async (post, _, context) => {
        if (!context.user) {
          return false;
        }

        return (
          (await LikeModel.countDocuments({
            post: post._id,
            user: context.user._id,
          })) > 0
        );
      },
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default PostType;

registerTypeLoader(PostType, load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
