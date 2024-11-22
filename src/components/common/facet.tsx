import { FacetValue, SpecificFacetSearchResult } from '@coveo/headless/ssr';
import { Checkbox } from '../ui/checkbox';

interface FacetProps {
  title: string;
  values: FacetValue[];
  facetSearchQuery: string;
  facetSearchResults: SpecificFacetSearchResult[];
  isLoading: boolean;
  onToggleValue?(value: FacetValue): void;
  onToggleSearchResult?(facetSearchResult: SpecificFacetSearchResult): void;
  onUpdateSearchQuery?(query: string): void;
  onSubmitSearch?(): void;
}

export default function FacetCommon({
  values,
  isLoading,
  onToggleValue,
}: FacetProps) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4" id="filters-heading">Filters</h2>
      <div className="space-y-2" role="group" aria-labelledby="filters-heading">
        {values.map(value => (
          <div key={value.value} className="flex items-center space-x-2">
            <Checkbox
              id={value.value}
              checked={value.state === 'selected'}
              onCheckedChange={() => onToggleValue?.(value)}
              aria-label={`Filter by ${value.value}`}
              disabled={isLoading}
            />
            <label
              htmlFor={value.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {value.value} ({value.numberOfResults} results)
            </label>
          </div>
        ))}
      </div>
    </>
  );
}