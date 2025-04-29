'use server';

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  let heads = new Headers();
  
  // Only import and use headers() in environments that support it (App Router)
  try {
    // Dynamic import to avoid breaking in Pages Router
    const { headers } = await import("next/headers");
    heads = new Headers(await headers());
  } catch (e) {
    console.log(e);
    // In Pages Router, we'll use default headers
    console.warn("Using default headers. Are you using Pages Router?");
  }
  
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
