import { GraphQLObjectType } from 'graphql';

import PostNew from '@/modules/post/subscriptions/PostNewSubscription';

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    PostNew,
  },
});

export default SubscriptionType;
