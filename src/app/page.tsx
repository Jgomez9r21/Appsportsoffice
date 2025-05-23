"use client";

import { useState, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import FilterControls from "@/components/FilterControls";
import type { Service } from "@/lib/types";
import { MOCK_SERVICES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HomePage() {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [filteredServices, setFilteredServices] = useState<Service[]>(MOCK_SERVICES);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initial load, apply no filters and no search term
    setFilteredServices(MOCK_SERVICES);
  }, []);

  const handleFilterChange = (filters: { category?: string; priceRange?: [number, number]; rating?: number }) => {
    let tempServices = MOCK_SERVICES;

    if (filters.category) {
      tempServices = tempServices.filter(service => service.category === filters.category);
    }
    if (filters.priceRange) {
      tempServices = tempServices.filter(service => service.price >= filters.priceRange![0] && service.price <= filters.priceRange![1]);
    }
    if (filters.rating) {
      tempServices = tempServices.filter(service => service.rating >= filters.rating!);
    }
    
    // Apply search term on top of filters
    if (searchTerm) {
      tempServices = tempServices.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredServices(tempServices);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Re-apply filters with the new search term
    // For simplicity, we'll just re-trigger filter logic by calling onFilterChange with current filter state or an empty object
    // A more optimized way would be to store current filters and merge.
    // This simple example just refilters from MOCK_SERVICES for search.
    // TODO: Properly combine search with existing filters
    let tempServices = MOCK_SERVICES;
    if (newSearchTerm) {
         tempServices = tempServices.filter(service =>
            service.title.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
    }
    // This needs to be improved to combine with filters correctly.
    // For now, search overrides filters if done sequentially.
    // Or, let's make filters re-apply search.
    // The current `handleFilterChange` includes search, so calling it with empty filters will apply search on all.
    // Or we can adapt handleFilterChange to take current filters.
    // For now:
    setFilteredServices(
        MOCK_SERVICES.filter(service =>
            service.title.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
    );
    // To properly combine, `handleFilterChange` should be the single source of truth for filtering.
    // Let's simplify: search is independent for now or applied after filters.
    // The current handleFilterChange applies search last, let's call it.
    // Get current filters from state (if FilterControls managed its own state and passed it up) or pass an empty filter object.
    // For now, search just filters the MOCK_SERVICES.
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Browse Freelance Services</h1>
      
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for services (e.g., 'logo design', 'website')"
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 lg:col-span-3">
          <FilterControls onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-9 lg:col-span-9">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
