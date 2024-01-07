import { ParameterizedContext } from 'koa';

import { IUser } from '@/modules/user/UserModel';
import { getDataloaders } from '@/modules/loader/loaderRegister';

interface ContextVars {
  ctx?: ParameterizedContext;
  user: IUser | null;
}

async function getContext({ ctx, user }: ContextVars) {
  const dataloaders = getDataloaders();

  return {
    ctx,
    dataloaders,
    user,
  } as const;
}

export { getContext };
