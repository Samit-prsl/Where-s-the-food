import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const aggregators = [
  { id: 'zomato', label: 'Zomato' },
  { id: 'swiggy', label: 'Swiggy' },
  { id: 'uberEats', label: 'Uber Eats' },
  { id: 'doorDash', label: 'DoorDash' },
  { id: 'deliveroo', label: 'Deliveroo' },
]