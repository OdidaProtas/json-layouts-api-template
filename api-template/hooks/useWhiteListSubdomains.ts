export default function useIsWhiteListSubdomain(subdomain) {
  const whiteLists = [
    "www",
    "marketplace",
    "json-layouts-api-template",
    "stilldrea-opulent-garbanzo-r967w5r9rq5fp4gg-3000",
  ];
  return whiteLists.includes(subdomain);
}
