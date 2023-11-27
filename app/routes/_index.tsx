import { useLoaderData } from "@remix-run/react";
import { useTina } from "tinacms/dist/react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "tina/__generated__/client";

import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};

export default function Index() {
  const { props } = useLoaderData() as any;
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });


  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <TinaMarkdown content={data.page.body} />
    </div>
  );
}
