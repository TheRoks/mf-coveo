import { SearchBox as SearchBoxController } from '@coveo/headless/ssr';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

interface SearchBoxCommonProps {
  controller: Omit<SearchBoxController, 'state' | 'subscribe'> | undefined;
  value: string;
}

export default function SearchBoxCommon({
  controller,
  value,
}: SearchBoxCommonProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      controller?.submit();
    }} className="mb-8">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search..."
          value={value}
          onChange={(e) => controller?.updateText(e.target.value)}
          aria-label="Search query"
        />
        <Button type="submit" aria-label="Perform search">
          <Search className="mr-2 h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
}