export default function useIsWhiteListSubdomain(subdomain) {
  const whiteLists = ["www", "marketplace", "json-layouts-api-template"];
  return whiteLists.includes(subdomain);
}
