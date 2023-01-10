export default function RenderImage({
  source,
  height = "100%",
  width = "100%",
  alt = "image",
}) {
  return <img height={height} width={width} src={source} alt={alt} />;
}
