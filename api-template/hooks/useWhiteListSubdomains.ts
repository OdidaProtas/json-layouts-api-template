export default function useIsWhiteListSubdomain(subdomain) {
  const whiteLists = [
    "www",
    "marketplace",
    "json-layouts-api-template",
    "docs",
    "admin",
    "demo",
    "shop",
    "dashboard",
    "dreamfeel",
    "support",
    "help",
    "payments",
    "blog",
    "accounts",
    "auth",
    "login",
    "logout",
    "home",
    "app",
    "editor",
    "api",
    "resources",
  ];
  return whiteLists.includes(subdomain);
}
