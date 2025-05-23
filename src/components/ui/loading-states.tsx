
import { LoadingSkeleton } from './loading-skeleton';

export const ContactListSkeleton = () => (
  <div className="space-y-4 p-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <LoadingSkeleton key={i} variant="card" />
    ))}
  </div>
);

export const ConversationSkeleton = () => (
  <div className="space-y-4 p-4">
    <div className="flex justify-start">
      <div className="flex items-end space-x-2">
        <LoadingSkeleton variant="avatar" className="w-8 h-8" />
        <div className="bg-muted rounded-lg p-3 max-w-xs">
          <LoadingSkeleton lines={2} />
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <div className="bg-primary rounded-lg p-3 max-w-xs">
        <LoadingSkeleton lines={1} />
      </div>
    </div>
    <div className="flex justify-start">
      <div className="flex items-end space-x-2">
        <LoadingSkeleton variant="avatar" className="w-8 h-8" />
        <div className="bg-muted rounded-lg p-3 max-w-xs">
          <LoadingSkeleton lines={3} />
        </div>
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <LoadingSkeleton key={i} variant="card" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LoadingSkeleton variant="card" />
      <LoadingSkeleton variant="card" />
    </div>
  </div>
);
