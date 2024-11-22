import {
  Controller,
  ControllerDefinitionsMap,
  SearchEngine,
  SearchEngineDefinitionOptions,
  defineFacet,
  defineResultList,
  defineSearchBox,
  defineContext,
  defineSearchParameterManager,
  defineTabManager,
} from '@coveo/headless/ssr';

export const config = {
  configuration: {
    organizationId: process.env.NEXT_PUBLIC_COVEO_ORGANIZATION_ID || '',
    accessToken: process.env.NEXT_PUBLIC_COVEO_ACCESSTOKEN || '',
    search: {
      searchHub: process.env.NEXT_PUBLIC_COVEO_SEARCHHUB || ''
    },
    analytics: {
      analyticsMode: 'next',
      trackingId: 'mf-coveo',
    },
  },
  controllers: {
    context: defineContext(),
    searchBox: defineSearchBox(),
    resultList: defineResultList(),
    tabManager: defineTabManager(),
    // tabAll: defineTab({
    //   options: { id: 'all', expression: '' },
    //   initialState: { isActive: true },
    // }),
    // tabCountries: defineTab({
    //   options: {
    //     id: 'countries',
    //     expression: '@source="Coveo Sample - Atlas"',
    //   },
    // }),
    // tabVideos: defineTab({
    //   options: { id: 'videos', expression: '@filetype=YouTubeVideo' },
    // }),
    facet: defineFacet({
      options: {
        facetId: 'filetype-1',
        field: 'filetype',
        tabs: { included: ['all', 'html'] },
      },
    }),
    searchParameterManager: defineSearchParameterManager(),
  },
} satisfies SearchEngineDefinitionOptions<
  ControllerDefinitionsMap<SearchEngine, Controller>
>;