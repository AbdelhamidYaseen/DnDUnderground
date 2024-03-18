



import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"
import { Marked } from 'marked';


import { drupal } from "lib/drupal"
import { Layout } from "components/layout"

import classStyles from "/styles/class.css/class.module.scss";
import { Class } from "components/class-components/node--class";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import Artefact from "components/artefact-components/node--artefact";

interface NodePageProps {
  node: DrupalNode
}
;

export default function NodePage({ node }: NodePageProps) {
    console.log(node)
  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      <div style={{padding:"1rem"}} className={classStyles.Container}>

        <Artefact 
            title={node.title} 
            desc={node.field_description} 
            rarity={node.field_rarity.name} 
            attunement={node.field_requires_attunement} 
            type={node.field_type.name}
        />
      
      </div>
</Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--artifact", context),
    fallback: "blocking",
  }
}

  export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<NodePageProps>> {
    const path = await drupal.translatePathFromContext(context)
  
    const type = path.jsonapi.resourceName
    let params = {}
    if (type === "node--artifact") {
      params = {
        include: "uid",
      }
    }
  
    const node = await drupal.getResourceFromContext<DrupalNode>(
      path,
      context,
      {
          params: {
              "fields[node--artifact]":
              "title,path,uid,field_description,field_rarity,field_requires_attunement,field_type",
            include: 
            "node_type,field_rarity,field_type"            
        }
      }
    )
  
    return {
      props: {
        node,
      },
    }
  }
  