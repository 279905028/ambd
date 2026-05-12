import { loginHandler } from '../../_shared/auth';

export const onRequestPost = async (context: any) => loginHandler(context);
