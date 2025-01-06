interface MaskPathProps {
  id: string;
  paths: Array<{
    d: string;
    transform?: string;
  }>;
  baseTransform?: string;
}

export function MaskPath({ id, paths, baseTransform }: MaskPathProps) {
  return (
    <defs>
      <mask id={id} maskUnits="userSpaceOnUse" mask-type="luminance">
        <rect width="100%" height="101%" fill="white" />
        {baseTransform ? (
          <g transform={baseTransform}>
            {paths.map((path, i) => (
              <path
                key={i}
                d={path.d}
                fill="black"
                transform={path.transform}
              />
            ))}
          </g>
        ) : (
          paths.map((path, i) => (
            <path key={i} d={path.d} fill="black" transform={path.transform} />
          ))
        )}
      </mask>
    </defs>
  );
}
