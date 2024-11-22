import { defineSearchEngine } from '@coveo/headless-react/ssr';
import { InferStaticState, InferHydratedState } from '@coveo/headless/ssr';
import { config } from '@/components/search-engine-config';

const engineDefinition = defineSearchEngine(config);

export type SearchStaticState = InferStaticState<typeof engineDefinition>;
export type SearchHydratedState = InferHydratedState<typeof engineDefinition>;

export const {
  fetchStaticState,
  hydrateStaticState,
  StaticStateProvider,
  HydratedStateProvider,
  setNavigatorContextProvider,
} = engineDefinition;

export const {
  useResultList,
  useSearchBox,
  useTabManager,
  useFacet,
  useSearchParameterManager,
} = engineDefinition.controllers;