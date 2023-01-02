import React from "react";
// import { GetServerSideProps } from "next";

import Box from "@mui/material/Box";

// import prisma from "../lib/prisma";
import { AppProps } from "../components/App";
import renderPage from "../components/util/renderPage";
import { usePagesStateValue } from "../lib/builder";
import helloWorld from "../lib/defaultApp";
import { useRouter } from "next/router";
import useApp from "../hooks/useApp";
import { AuthSpinner } from ".";
import { useSession } from "next-auth/react";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const app = await prisma.app.findUnique({
//     where: {
//       id: String(params?.id),
//     },
//     include: {
//       author: {
//         select: { name: true, email: true },
//       },
//     },
//   });
//   return {
//     props: app,
//   };
// };

const App: React.FC<AppProps> = () => {
  const router = useRouter();
  const app = useApp() ?? { draft: undefined };
  const loading = usePagesStateValue("loaders.apps");
  const pages = JSON.parse(app.draft ?? "[]");
  const { status: authStatus } = useSession();

  const currentPath = usePagesStateValue("path") ?? "/";

  let title = app.name;

  if (!app.published) {
    title = `${title} (Draft)`;
  }

  const findPage = () => {
    const currentPage = pages.find((page) => page.path === currentPath);
    if (currentPage) {
      return currentPage;
    }
    return pages[0];
  };

  if (loading || authStatus === "loading") {
    return <AuthSpinner />;
  }

  return <Box>{renderPage(findPage() ?? { ...helloWorld })}</Box>;
};

export default App;
