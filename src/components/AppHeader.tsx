import { SidebarTrigger } from "@/components/ui/sidebar";
import { Briefcase } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <Briefcase className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold text-primary">TaskVerse</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {/* Placeholder for User Profile/Actions */}
        {/* <UserNav /> */}
      </div>
    </header>
  );
}
