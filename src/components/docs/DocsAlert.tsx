
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle, CheckCircle, Lightbulb, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'warning' | 'success' | 'tip' | 'note';

interface DocsAlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: AlertVariant;
  className?: string;
  hideDefaultTitle?: boolean;
}

const DocsAlert: React.FC<DocsAlertProps> = ({
  title,
  children,
  variant = 'info',
  className,
  hideDefaultTitle = false,
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'warning':
        return 'border-amber-500/50 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-900/20';
      case 'success':
        return 'border-green-500/50 dark:border-green-500/30 bg-green-50 dark:bg-green-900/20';
      case 'tip':
        return 'border-purple-500/50 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-900/20';
      case 'note':
        return 'border-slate-500/50 dark:border-slate-500/30 bg-slate-50 dark:bg-slate-900/20';
      case 'info':
      default:
        return 'border-blue-500/50 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-purple-500 dark:text-purple-400" />;
      case 'note':
        return <BookText className="h-5 w-5 text-slate-500 dark:text-slate-400" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    }
  };

  const getDefaultTitle = (): string => {
    switch (variant) {
      case 'warning':
        return 'Warning';
      case 'success':
        return 'Success';
      case 'tip':
        return 'Tip';
      case 'note':
        return 'Note';
      case 'info':
      default:
        return 'Information';
    }
  };

  return (
    <Alert className={cn(getVariantStyles(), 'my-6', className)}>
      {getIcon()}
      {!hideDefaultTitle && (title || (!hideDefaultTitle && !title)) && (
        <AlertTitle className="font-medium">
          {title || getDefaultTitle()}
        </AlertTitle>
      )}
      <AlertDescription className="mt-1">{children}</AlertDescription>
    </Alert>
  );
};

export default DocsAlert;
