export default function useIsWhiteListSubdomain(subdomain) {
  const whiteLists = [
    "www",
    "marketplace",
    "json-layouts-api-template",
    "odidaprotas-orange-guacamole-grqq5jgx5xxfrvj-3000",
    "localhost",
  ];
  return whiteLists.includes(subdomain);
}
