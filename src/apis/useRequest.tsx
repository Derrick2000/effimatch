import {useState, useMemo, useRef, useEffect} from 'react';
import axios, {AxiosError, CancelTokenSource, AxiosResponse} from 'axios';
import ApiClient from './apiClient';

export interface RequestConfigCreator<TReq, TResp> {
  (args: TReq): any;

  TReq: TReq;
  TResp: TResp;
}

interface RequestOptions<TReq, TResp> {
  defaultData?: ApiResponseWrapper<TResp>;
  onSuccess?: (
    data: ApiResponseWrapper<TResp>,
    params: TReq,
    requestConfig: AxiosResponse<ApiResponseWrapper<TResp>>,
  ) => void;
  onFail?: (error: any, params: TReq, axiosResp: AxiosError) => void;
  onFinally?: () => void;
}

interface ApiResponseWrapper<TData> {
  data: TData;
  message: string | null;
  code: number;
}

export const useRequest = <
  T extends RequestConfigCreator<T['TReq'], T['TResp']>
>(
  requestConfigCreator: T,
  options?: RequestOptions<T['TReq'], T['TResp']>,
) => {
  const {defaultData} = options || {};
  const optionsRef = useRef(options);
  const [data, setData] = useState<ApiResponseWrapper<T['TResp']> | undefined>(
    defaultData,
  );
  const [status, setStatus] = useState({loading: false, error: undefined});
  const sourceRef = useRef<CancelTokenSource | null>(null);

  const cancelRequest = () => {
    if (sourceRef.current != null) {
      sourceRef.current.cancel();
    }
  };

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => () => cancelRequest(), []);

  const request = useMemo(() => {
    return (params: T['TReq']) => {
      cancelRequest();
      sourceRef.current = axios.CancelToken.source();
      setStatus({loading: true, error: undefined});

      return ApiClient.getInstance()
        ?.request(requestConfigCreator(params))
        .then((resp: AxiosResponse<ApiResponseWrapper<T['TResp']>>) => {
          sourceRef.current = null;

          setData(resp.data);
          setStatus({loading: false, error: undefined});
          optionsRef.current?.onSuccess &&
            optionsRef.current?.onSuccess(resp.data, params, resp);

          return Promise.resolve(resp);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            return;
          }

          sourceRef.current = null;

          setStatus({loading: false, error: err.response?.data});
          optionsRef.current?.onFail &&
            optionsRef.current?.onFail(err.response?.data, params, err);
          return Promise.reject(err);
        })
        .finally(() => {
          optionsRef.current?.onFinally && optionsRef.current?.onFinally();
        });
    };
  }, []);

  return [request, data, status.loading, status.error] as const;
};
