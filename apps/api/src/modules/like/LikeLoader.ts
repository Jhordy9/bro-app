import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import LikeModel from './LikeModel';

const {
  Wrapper: Like,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: LikeModel,
  loaderName: 'LikeLoader',
});

export { getLoader, clearCache, load, loadAll };

export default Like;

registerLoader('LikeLoader', getLoader);
