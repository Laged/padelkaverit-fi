export interface SVGConfig {
  viewBox: {
    width: number;
    height: number;
  };
  baseTransform: string;
  paths: Array<{
    d: string;
    transform?: string;
  }>;
}
