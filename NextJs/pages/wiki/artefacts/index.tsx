/*
  * Wiki page
  * Contains guides for the subparts of every the wiki (small introductions)
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
import { useRouter } from "next/router";
import { clear } from "console";
import { ArtefactTable } from "components/artefact-components/node--artefacttable";


interface IndexPageProps {
    nodes: DrupalNode[],
    nextpage: any[]
}


const Page = ({nodes, nextpage}:IndexPageProps) =>{
    
    //console.log(nodes)
    
    const router = useRouter();
    const { page } = router.query;
    const currentPage = parseInt(Array.isArray(page) ? page[0] : page) || 1;
  
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      router.push({
        pathname: router.pathname,
        query: { page: nextPage },
      });
    };
  
    const handlePrevPage = () => {
      const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
      router.push({
        pathname: router.pathname,
        query: { page: prevPage },
      });
    };
      return(
        <Layout>
            <Head>
                <title>Artefacts</title>
                <meta
                    name="description"
                    content="An overview of all magic items."
                />
            </Head>
          
            
            
          
            <div style={{padding: "1rem"}}>
                <div className={base.pageheadercontainer}>
                    <h1 className={base.pageheader} >Artefacts </h1>
                    <hr style={{border:"solid darkblue 2px",marginLeft:"auto",marginRight:"auto", width:"85%"}}/>
                </div>        
                <div style={{marginLeft:"auto",marginRight:"auto", width:"85%"}}>

                        <ArtefactTable data={[...nodes.map((e)=>({
                        data:{
                            title: e.title,
                            desc: e.field_description,
                            rarity: e.field_rarity.name,
                            attunement: e.field_attunement,
                            type: e.field_type.name,
                            path: e.path.alias,
                        }

                        }
                        ))]}/>



                    <div className={base.PaginationHolder}>
                      {
                      currentPage !== 1 ? 
                      <>
                          <button onClick={handlePrevPage} disabled={currentPage === 1} className={base.Previous}>
                          {currentPage - 1 }
                          </button>
                      </>
                      : 
                      <></>
                      }
                        <p className={base.Current}>{currentPage}</p>
                      
                      {
                        nextpage.length !== 0 ?
                        <>
                          <button onClick={handleNextPage} className={base.Next}>{currentPage + 1}</button>
                        </>
                        :
                        <></>
                      }
                    </div>
                </div>  
            </div>
        </Layout>
    )
}

export async function getServerSideProps (context): Promise<GetServerSidePropsResult<IndexPageProps>> {
    const { query } = context;
    const page = query.page ? parseInt(Array.isArray(query.page) ? query.page[0] : query.page) : 1;
    const limit = 15;
    const offset = (page - 1) * limit;

    const response = await fetch(`http://127.0.0.1:63309/jsonapi/node/artifact?page[offset]=${(page) * limit}&page[limit]=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const nextpage = data.data;

    const params = new DrupalJsonApiParams()
    .addFields("node--artifact", ["title","path","uid","field_description","field_rarity","field_requires_attunement","field_type"])
    .addInclude(["node_type","field_rarity","field_type"])
    .addPageLimit(limit)
    .addPageOffset(offset)
    //.addFilter()
    ;

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--artifact",
      context,
      {
        params: params.getQueryObject()
      }
    );

    return {
      props: {
        nodes,
        nextpage
      },
    };
  }

export default Page;