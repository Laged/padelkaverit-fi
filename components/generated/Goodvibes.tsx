
import { PathConfig } from '../types';
import { config } from './GoodvibesMask';

export interface GoodvibesProps {
  className?: string;
}

export function Goodvibes({ className }: GoodvibesProps) {
  return (
    <svg 
      viewBox="0 0 938.56267 1232.7878"
      className={className}
    >
      {config.paths.map((path: PathConfig, i: number) => (
        <path
          key={i}
          d={path.d}
          transform={path.transform}
          clipPath={path.clipPath}
        />
      ))}
    </svg>
  );
}
