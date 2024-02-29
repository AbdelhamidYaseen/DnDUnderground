import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeSpell } from "components/node--spell"


interface NodePageProps {
  node: DrupalNode
}

export default function NodePage({ node }: NodePageProps) {
  //console.log(node)
  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      <NodeSpell node={node} />
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--spell", context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  const type = path.jsonapi.resourceName
  let params = {}
  if (type === "node--spell") {
    params = {
      include: "uid",
    }
  }

  const node = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params:{
        "fields[node--spell]":
        "title,body,path,uid,field_level,field_components,field_casting_time,field_duration,field_magic_school,field_ritual,field_concentration,field_magic_casters,alias,field_range",
      include: "field_magic_school,field_components,field_magic_casters",
  }
    }
  )

  return {
    props: {
      node,
    },
  }
}
