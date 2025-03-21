
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { File } from 'lucide-react';

type SidebarItemProps = {
  title: string;
  path: string;
  isActive: boolean;
};

const SidebarItem = ({ title, path, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "block py-2 px-2 text-sm transition-colors rounded-md",
        isActive
          ? "font-medium text-primary bg-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {title}
    </Link>
  );
};

export default SidebarItem;
