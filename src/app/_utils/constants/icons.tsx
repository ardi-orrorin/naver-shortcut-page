import type { SVGProps } from "react";

export const SearchIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 3.482 9.757l.18-.171.171-.18A5.5 5.5 0 0 0 10.5 5Zm8.72 11.438 2.22 2.22-1.06 1.06-2.22-2.219 1.06-1.061Z" />
  </svg>
);

export const MapPinIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2a7 7 0 0 0-7 7c0 4.323 5.5 11.056 6.104 11.768a1.188 1.188 0 0 0 1.792 0C13.5 20.056 19 13.323 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

export const StoreIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M5 4h14l1 5.5A2.5 2.5 0 0 1 17.55 12H17v6a1 1 0 0 1-1 1h-3v-4h-2v4H8a1 1 0 0 1-1-1v-6h-.55A2.5 2.5 0 0 1 4 9.5ZM5 2a2 2 0 0 0-2 2v.23a1 1 0 0 0 .03.25l1.2 4.79A4.49 4.49 0 0 0 6.45 12H7v6a3 3 0 0 0 3 3h2a1 1 0 0 0 1-1v-3h1v3a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3v-6h.55a4.5 4.5 0 0 0 4.21-5.73l-1.2-4.79A1 1 0 0 0 21 4V2Z" />
  </svg>
);

const icons = {
  SearchIcon,
  MapPinIcon,
  StoreIcon
};

export default icons;
