export type DataLoaders = {
  UserLoader: ReturnType<typeof import('../user/UserLoader').getLoader>;
  PostLoader: ReturnType<typeof import('../post/PostLoader').getLoader>;
  LikeLoader: ReturnType<typeof import('../like/LikeLoader').getLoader>;
};

const loaders: {
  [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {} as any;

const registerLoader = <Name extends keyof DataLoaders>(
  key: Name,
  getLoader: () => DataLoaders[Name]
) => {
  loaders[key] = getLoader as any;
};

const getDataloaders = (): DataLoaders =>
  (Object.keys(loaders) as (keyof DataLoaders)[]).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {}
  ) as any;

export { registerLoader, getDataloaders };
