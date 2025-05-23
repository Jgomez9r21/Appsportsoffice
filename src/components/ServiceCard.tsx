import Image from "next/image";
import type { Service } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={service.imageUrl}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={service.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{service.category}</Badge>
        <CardTitle className="text-lg mb-1">{service.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{service.description}</CardDescription>
        <p className="text-xs text-muted-foreground">By {service.freelancerName}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div>
          <p className="text-xl font-bold text-primary">${service.price}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {service.rating.toFixed(1)}
          </div>
        </div>
        <Button size="sm">View Service</Button>
      </CardFooter>
    </Card>
  );
}
