import {
  defineSearchEngine,
  InferStaticState,
  InferHydratedState,
} from '@coveo/headless/ssr';
import { config } from '@/components/search-engine-config';

const engineDefinition = defineSearchEngine(config);

export type SearchStaticState = InferStaticState<typeof engineDefinition>;
export type SearchHydratedState = InferHydratedState<typeof engineDefinition>;

export const {
  fetchStaticState,
  hydrateStaticState,
  setNavigatorContextProvider,
} = engineDefinition;