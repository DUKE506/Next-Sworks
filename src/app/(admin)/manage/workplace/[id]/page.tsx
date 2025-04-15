import React from "react";
import ClientPage from "./clientPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ClientPage id={parseInt(id)} />;
};

export default Page;
