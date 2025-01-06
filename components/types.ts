export type PathConfig = {
  d: string;
  transform?: string;
  clipPath?: string;
};

export type SVGConfig = {
  viewBox: {
    width: number;
    height: number;
  };
  paths: PathConfig[];
  baseTransform: string;
};
