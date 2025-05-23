"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ListFilter } from "lucide-react";

interface FilterControlsProps {
  onFilterChange: (filters: { category?: string; priceRange?: [number, number]; rating?: number }) => void;
}

export default function FilterControls({ onFilterChange }: FilterControlsProps) {
  const [category, setCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState<number | undefined>();

  const handleApplyFilters = () => {
    onFilterChange({
      category: category === "all" ? undefined : category,
      priceRange,
      rating,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <ListFilter className="mr-2 h-6 w-6 text-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category" className="text-md font-medium">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="w-full mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {SERVICE_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="price-range" className="text-md font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
          <Slider
            id="price-range"
            min={0}
            max={2000}
            step={50}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="rating" className="text-md font-medium">Minimum Rating</Label>
           <Select value={rating ? rating.toString() : undefined} onValueChange={(val) => setRating(val ? parseInt(val) : undefined)}>
            <SelectTrigger id="rating" className="w-full mt-1">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_ratings">Any Rating</SelectItem>
              {[5, 4, 3, 2, 1].map(r => (
                <SelectItem key={r} value={r.toString()}>{r} Star{r > 1 ? 's' : ''} & Up</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
