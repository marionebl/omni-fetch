/// <reference path="typings/main.d.ts" />
/// <reference path="isomorphic-fetch.d.ts" />
declare module "omni-fetch" {
  import {RequestOptions} from "http";
  import {RequestInit, Response} from "isomorphic-fetch";
  export default function fetch(url: string, options?: RequestOptions | RequestInit): Promise<Response>;
}