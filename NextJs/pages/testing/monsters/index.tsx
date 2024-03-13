/*
  * Monsters page
  * Renders all monsters nodes
  * Requires getStaticProps to run && the endpoint to exist else it will crash
*/
import { Layout } from "components/layout";
import { MonsterTable } from "components/monster-components/node--monstertable";
import { drupal } from "lib/drupal";
import { GetServerSidePropsResult, GetStaticPathsContext, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalView } from "next-drupal";
import Head from "next/head";
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import path from "path";
import { useEffect, useState } from "react";
import base from "/styles/layout.css/layout.module.scss";


interface IndexPageProps {
    nodes: DrupalNode[]
}
let ITEMS_PER_PAGE = 15;

export default function Page ({nodes}:IndexPageProps,{pagination}){
  console.log(nodes[0])
  return(
        <Layout>
            <Head>
                <title>The Beastiary</title>
                <meta
                    name="description"
                    content="An overview of all monsters."
                />
            </Head>
            <div style={{padding: "1rem"}}>
                <div className={base.pageheadercontainer}>
                    <h1 className={base.pageheader} >Monsters </h1>
                    <hr style={{border:"solid darkblue 2px",marginLeft:"auto",marginRight:"auto", width:"85%"}}/>
                </div>        
                <div style={{marginLeft:"auto",marginRight:"auto", width:"85%"}}>


                <MonsterTable data={[...nodes.map((e)=>({
                  data:{
                    cr: e.field_monster_base_values.field_challenge_rating,
                    name: e.title,
                    type: e.field_monster_base_values.field_type.name,
                    size: e.field_monster_base_values.field_size.name,
                    alignment: e.field_monster_base_values.field_aligment.name,
                    path: e.path.alias
                  }

                }
                ))]}/>

                </div>  
            </div>
        </Layout>
    )
}


export async function getServerSideProps (
    context
  ): Promise<GetServerSidePropsResult<IndexPageProps>> {
    const params = new DrupalJsonApiParams()
    .addFields("node--monster", ["title","body","path","uid","field_monster_base_values"])
    .addFields("node--monster.links",["previous","next","first"])
    .addInclude(["node_type", "revision_uid", "uid,field_monster_base_values.field_aligment", "field_monster_base_values.field_size", "field_monster_base_values.field_aligment", "field_monster_base_values.field_type"])
    .addSort('field_monster_base_values.field_challenge_rating','ASC')
    .addPageLimit(ITEMS_PER_PAGE)
    ;

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--monster",
      context,
      {
        params: params.getQueryObject()
      }
    );
    return {
      props: {
        nodes,
      },
    };
  }