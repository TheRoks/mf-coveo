import { Result } from '@coveo/headless/ssr';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { redirect } from 'next/navigation';

interface ResultListCommonProps {
  results: Result[];
}

export default function ResultListCommon({ results }: ResultListCommonProps) {

  const handleResultClick = (clickUri: string) => {
    redirect(clickUri);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4" id="results-heading">Search Results</h2>
      <div className="space-y-4" role="list" aria-labelledby="results-heading">
        {results.map(result => (
          <Card
            key={result.uniqueId}
            className={`cursor-pointer transition-shadow hover:shadow-md ${result.isTopResult ? 'border-2 border-primary' : ''
              }`}
            onClick={() => handleResultClick(result.clickUri)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleResultClick(result.clickUri)
              }
            }}
            tabIndex={0}
            role="listitem"
            aria-label={`${result.title}${result.isTopResult ? ', Top Result' : ''}`}
          >
            <CardHeader>
              <CardTitle className="text-lg">
                {result.title}
                {result.isTopResult && (
                  <span className="ml-2 text-xs font-normal text-primary">
                    Top Result
                    <span className="sr-only"> - This is a top search result</span>
                  </span>
                )}
              </CardTitle>
              <CardDescription>{result.excerpt}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}