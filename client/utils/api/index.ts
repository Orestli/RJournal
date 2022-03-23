import type { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { UserApi } from './user';
import axios from 'axios';
import { PostApi } from './post';
import { CommentApi } from './comment';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.rtoken;

  const instance = axios.create({
    baseURL: 'http://localhost:7777/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apis = {
    user: UserApi,
    post: PostApi,
    comment: CommentApi,
  };

  return Object.entries(apis).reduce((prev, [key, fn]) => {
    return {
      ...prev,
      [key]: fn(instance),
    };
  }, {} as ApiReturnType);
};
