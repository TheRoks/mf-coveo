'use client';

import { useSearchBox } from '@/lib/engine';
import SearchBoxCommon from './common/search-box';

export default function SearchBox() {
  const { state, methods } = useSearchBox();

  return <SearchBoxCommon controller={methods} value={state.value} />;
}