import { SVGConfig } from "../components/Masks/types";

export function svgToConfig(svgContent: string): SVGConfig {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) throw new Error("Invalid SVG");

  const viewBox = svg.getAttribute("viewBox")?.split(" ").map(Number) || [];
  const g = svg.querySelector("g");
  const paths = Array.from(svg.querySelectorAll("path"));

  return {
    viewBox: {
      width: viewBox[2],
      height: viewBox[3],
    },
    baseTransform: g?.getAttribute("transform") || "",
    paths: paths.map((path) => ({
      d: path.getAttribute("d") || "",
      transform: path.getAttribute("transform") || undefined,
    })),
  };
}
