import { Facet } from '@/components/facets';
import ResultList from '@/components/result-list';
import SearchBox from '@/components/search-box';
import { SearchPageProvider } from '@/components/search-page';
import SearchParameterManager from '@/components/search-parameter-manager';
import {
  fetchStaticState,
  setNavigatorContextProvider,
} from '@/lib/engine';
import { buildSSRSearchParameterSerializer } from '@coveo/headless-react/ssr';
import { headers } from 'next/headers';
import { NextJsAppRouterNavigatorContext } from '../navigatorContextProvider';


/**
 * This file defines a Search component that uses the Coveo Headless library to manage its state.
 *
 * The Search function is the entry point for server-side rendering (SSR). It uses the `buildSearchParameterSerializer` util from the Coveo Headless
 * library to serialize the url search parameters into a string, which is then used by the [SearchParameterManager](https://docs.coveo.com/en/headless/latest/reference/search/controllers/search-parameter-manager) controller.
 *
 * To synchronize search parameters with the URL with more control on the serialization, you can use the [SearchParameterManager](https://docs.coveo.com/en/headless/latest/reference/search/controllers/search-parameter-manager/) controller. For sake of brevity, this sample uses the SearchParameterManager controller.
 *
 * The context values are hard-coded to represent a specific user segment (age group 30-45 with a main interest in sports) as the initial context.
 * These values will be added to the payload of the search request when the search page is rendered.
 */

export default async function Search(props: { params: Promise<{ q: string }> }) {
  // Convert URL search parameters into a format that Coveo's search engine can understand.
  const { toSearchParameters } = buildSSRSearchParameterSerializer();
  const searchParameters = toSearchParameters(await props.params);

  // Defines hard-coded context values to simulate user-specific information.
  const contextValues = {
    ageGroup: '30-45',
    mainInterest: 'sports',
  };

  // Sets the navigator context provider to use the newly created `navigatorContext` before fetching the app static state
  const navigatorContext = new NextJsAppRouterNavigatorContext(await headers());

  setNavigatorContextProvider(() => navigatorContext);

  // Fetches the static state of the app with initial state (when applicable)
  const staticState = await fetchStaticState({
    controllers: {
      context: {
        initialState: {
          values: contextValues,
        },
      },
      searchParameterManager: {
        initialState: { parameters: searchParameters },
      },
    },
  });

  return (
    <div className="container mx-auto p-4">
      <SearchPageProvider
        staticState={staticState}
        navigatorContext={navigatorContext.marshal}
      >
        <header>
          <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        </header>
        <SearchBox />
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4" aria-label="Search filters">
            <Facet />
          </aside>
          <main className="w-full md:w-3/4">
            <ResultList />
            <SearchParameterManager />
          </main>
        </div>
      </SearchPageProvider>
    </div>
  );
}

// A page with search parameters cannot be statically rendered, since its rendered state should look different based on the current search parameters.
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-dynamic';