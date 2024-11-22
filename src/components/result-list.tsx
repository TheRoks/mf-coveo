'use client';

import { useResultList } from '@/lib/engine';
import ResultListCommon from './common/result-list';

export default function ResultList() {
  const { state } = useResultList();

  return <ResultListCommon results={state.results} />;
}