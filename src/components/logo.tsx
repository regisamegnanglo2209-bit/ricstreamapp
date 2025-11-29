import { TvIcon } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <TvIcon className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold font-headline text-white">
        Ric<span className="text-primary">Streaming</span>
      </span>
    </div>
  );
}
