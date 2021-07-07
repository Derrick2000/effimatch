import {AxiosRequestConfig} from 'axios';

export const createRequestConfig = <TReq, TResp = any>(
  _: string,
  requestConfigCreator: (args: TReq) => AxiosRequestConfig,
) => {
  const fn = (args: TReq) => {
    return requestConfigCreator(args);
  };

  return Object.assign(fn, {
    TReq: {} as TReq,
    TResp: {} as TResp,
  });
};
