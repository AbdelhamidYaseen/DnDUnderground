import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"
import { Marked } from 'marked';


import { drupal } from "lib/drupal"
import { Layout } from "components/layout"

import classStyles from "/styles/class.css/class.module.scss";
import { Race } from "components/race-components/node--race";

interface NodePageProps {
  node: DrupalNode
}
;

export default function NodePage({ node }: NodePageProps) {
  //console.log(node.field_race_base_values[0].field_age)
  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      <div style={{padding:"1rem"}} className={classStyles.Container}>

        <Race 
        title={node.title} 
        description={node.body.value} 
        base_values={{
          age: node.field_race_base_values.field_age,
          alignment: node.field_race_base_values.field_race_aligment,
          movement: "",
          languages: node.field_race_base_values.field_race_languages,
          size: node.field_race_base_values.field_race_size,
          vision: node.field_race_base_values.field_race_vision,
          traits: node.field_race_base_values.field_traits
        }} 
        attribute_increases={node.field_attributes_increases.map((f)=>({
          name: f.field_attribute,
          amount: f.field_attribute_increase_amount
        }))}/>
      
      </div>
</Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--race", context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)
  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName
  let params = {}
  if (type === "node--race") {
    params = {
      include: "uid",
    }
  }

  const node = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
        params: {
            "fields[node--race]":
            "title,body,path,uid,field_attributes_increases,field_race_base_values",
            include: 
            "field_attributes_increases.field_attribute,field_attributes_increases.paragraph_type,field_race_base_values.paragraph_type,field_race_base_values.field_movement_speed",
          }
    }
  )

  return {
    props: {
      node,
    },
  }
}
