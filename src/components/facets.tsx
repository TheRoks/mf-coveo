'use client';

import { useFacet } from '@/lib/engine';
import FacetCommon from './common/facet';

export const Facet = () => {
  const { state, methods } = useFacet();

  if (!state.enabled) {
    return;
  }

  return (
    <FacetCommon
      title="Title"
      values={state.values}
      facetSearchQuery={state.facetSearch.query}
      facetSearchResults={state.facetSearch.values}
      isLoading={state.isLoading}
      onToggleValue={methods && ((value) => methods.toggleSelect(value))}
      onUpdateSearchQuery={
        methods && ((query) => methods.facetSearch.updateText(query))
      }
      onSubmitSearch={methods && (() => methods.facetSearch.search())}
      onToggleSearchResult={
        methods && ((result) => methods.facetSearch.select(result))
      }
    />
  );
};