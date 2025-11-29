import { TvIcon } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 160 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.2082 10.709C26.2082 9.07101 24.8462 7.70902 23.2082 7.70902C21.5702 7.70902 20.2082 9.07101 20.2082 10.709C20.2082 20.2796 12.5706 27.9172 3.00001 27.9172C1.36202 27.9172 0 29.2792 0 30.9172C0 32.5552 1.36202 33.9172 3.00001 33.9172C15.6558 33.9172 26.2082 23.365 26.2082 10.709Z"
          fill="url(#paint0_linear_logo)"
        />
        <path
          d="M40.1667 20.25C40.1667 18.612 38.8047 17.25 37.1667 17.25C35.5287 17.25 34.1667 18.612 34.1667 20.25C34.1667 34.0251 23.0918 45.0999 9.31667 45.0999C7.67868 45.0999 6.31667 46.4619 6.31667 48.0999C6.31667 49.7379 7.67868 51.0999 9.31667 51.0999C26.1768 51.0999 40.1667 37.1101 40.1667 20.25Z"
          fill="url(#paint0_linear_logo)"
        />
        <path
          d="M148.667 36.3333C155.038 36.3333 160 41.2957 160 47.6667V92.3333C160 98.7043 155.038 103.667 148.667 103.667H51.3333C44.9623 103.667 40 98.7043 40 92.3333V47.6667C40 41.2957 44.9623 36.3333 51.3333 36.3333H148.667ZM110.893 67.5408L79.1651 84.85C77.2917 85.8794 75 84.4691 75 82.309V57.691C75 55.5309 77.2917 54.1206 79.1651 55.15L110.893 72.4592C112.723 73.4612 112.723 76.5388 110.893 67.5408Z"
          fill="currentColor"
        />
        <defs>
            <linearGradient id="paint0_linear_logo" x1="0" y1="30" x2="40" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--accent))"/>
            <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0.6"/>
            </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-bold font-headline text-white">
        RIC<span className="text-primary">STREAMING</span>
      </span>
    </div>
  );
}
