import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Mock data for search results
const mockResults = [
  { id: 1, title: "Introduction to React", excerpt: "Learn the basics of React, a popular JavaScript library for building user interfaces.", isTopResult: true },
  { id: 2, title: "Advanced React Patterns", excerpt: "Explore advanced React patterns to build scalable and maintainable applications.", isTopResult: true },
  { id: 3, title: "React Hooks in Depth", excerpt: "Dive deep into React Hooks and learn how to use them effectively in your projects.", isTopResult: false },
  { id: 4, title: "State Management in React", excerpt: "Compare different state management solutions for React applications.", isTopResult: false },
  { id: 5, title: "React Performance Optimization", excerpt: "Learn techniques to optimize the performance of your React applications.", isTopResult: false },
]

// Mock data for facets
const facets = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
]

export default function SearchResultPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFacets, setSelectedFacets] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here
    console.log('Searching for:', searchQuery)
  }

  const handleFacetChange = (facetId: string) => {
    setSelectedFacets(prev => 
      prev.includes(facetId) 
        ? prev.filter(id => id !== facetId)
        : [...prev, facetId]
    )
  }

  const handleResultClick = (resultId: number) => {
    // Implement result click logic here
    console.log('Clicked result:', resultId)
  }

  return (
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      </header>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search query"
          />
          <Button type="submit" aria-label="Perform search">
            <Search className="mr-2 h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4" aria-label="Search filters">
          <h2 className="text-lg font-semibold mb-4" id="filters-heading">Filters</h2>
          <div className="space-y-2" role="group" aria-labelledby="filters-heading">
            {facets.map(facet => (
              <div key={facet.id} className="flex items-center space-x-2">
                <Checkbox
                  id={facet.id}
                  checked={selectedFacets.includes(facet.id)}
                  onCheckedChange={() => handleFacetChange(facet.id)}
                  aria-label={`Filter by ${facet.label}`}
                />
                <label
                  htmlFor={facet.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {facet.label}
                </label>
              </div>
            ))}
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold mb-4" id="results-heading">Search Results</h2>
          <div className="space-y-4" role="list" aria-labelledby="results-heading">
            {mockResults.map(result => (
              <Card 
                key={result.id} 
                className={`cursor-pointer transition-shadow hover:shadow-md ${
                  result.isTopResult ? 'border-2 border-primary' : ''
                }`}
                onClick={() => handleResultClick(result.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleResultClick(result.id)
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
        </main>
      </div>
    </div>
  )
}

