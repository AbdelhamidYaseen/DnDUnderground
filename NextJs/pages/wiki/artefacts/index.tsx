/*
  * Wiki page
  * Contains guides for the subparts of every the wiki (small introductions)
*/
import { Layout } from "components/layout";
import { drupal } from "lib/drupal";
import { GetServerSidePropsResult, GetStaticPathsContext, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalTaxonomyTerm, DrupalView } from "next-drupal";
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
    nextpage: any[],
    totalCount: number,
    terms:{
      types:string[],
      rarity:string[]
    }

}


const Page = ({nodes, nextpage, totalCount,terms}:IndexPageProps) =>{
  const [limit, setLimit] = useState<string>(""||"15");
  const [filterRarity, setFilterRarity] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterName, setFilterName] = useState<string>("");

    
    const router = useRouter();
    const { page } = router.query;
    const { amount  } = router.query

      /*Functionality Search & Filters*/
  const handleFilters = () => {
    const filters = {
      rarity: filterRarity,
      type: filterType,
      name: filterName,
      amount: limit
    };
    const validFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v));
    router.push({
      pathname: router.pathname,
      query: validFilters
    });
  }

      /*Pagination Functionality*/
      const currentPage = parseInt(Array.isArray(page) ? page[0] : page) || 1;
      const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const currentQuery = router.query;
        const updatedQuery = { ...currentQuery, page: nextPage };
        router.push({
          pathname: router.pathname,
          query: updatedQuery,
        });
      };
      const handlePrevPage = () => {
        const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
        const currentQuery = router.query;
        const updatedQuery = { ...currentQuery, page: prevPage };
        router.push({
          pathname: router.pathname,
          query: updatedQuery,
        });
      };
      const handleResetPage = () => {
        const currentQuery = router.query;
        const updatedQuery = { ...currentQuery, page: 1 };
        router.push({
          pathname: router.pathname,
          query: updatedQuery,
        });
      };
      const handleLastPage = () => {
        const totalLimit = parseInt(amount as string) || 15; 
        const lastPage = Math.ceil(totalCount / totalLimit);
        const currentQuery = router.query;
        const updatedQuery = { ...currentQuery, page: lastPage };
        router.push({
          pathname: router.pathname,
          query: updatedQuery,
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
                        ))]}
                        useStates={{
                          limit: limit,
                          setLimit: setLimit,
                          handleFilters:handleFilters,
                          filterType:filterType,
                          setFilterType:setFilterType,
                          filterRarity:filterRarity,
                          setFilterRarity:setFilterRarity,
                          filterName: filterName,
                          setFilterName:setFilterName
                        }}
                        filters={{
                          type: terms.types,
                          rarity: terms.rarity
                        }}
                        />



                      <div className={base.PaginationHolder}>
                      {
                      currentPage !== 1 ? 
                      <>
                          <button  onClick={handleResetPage} disabled={currentPage === 1} className={base.Previous}>&lt;&lt;</button>
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
                          <button onClick={handleLastPage} className={base.Next}>&gt;&gt;</button>
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
  //query
  const { query } = context;
  const page = query.page ? parseInt(Array.isArray(query.page) ? query.page[0] : query.page) : 1;

  //filter
    const urlMaker = (amount:string, name:string, type:string, rarity:string)=>{
      let url = `http://127.0.0.1:59001/jsonapi/node/artifact?page[offset]=${(page) * limit}`
      if(amount != null){
        url += `&page[limit]=${limit}`
      }
      if(name != null){
        url += `&filter[title]=${name}`
      }
      if(type != null){
        url += `&filter[field_type.name]=${type}`
      }
      if(rarity != null){
        url += `&filter[field_rarity.name]=${rarity}`
      }
      return url;
    }
    //filters here
    const amount:string = query.amount || 15
    const type:string = query.type
    const itemRarity:string = query.rarity
    const name:string = query.name
  //limit & offset
    const limit = parseInt(amount);
    const offset = (page - 1) * limit;
  //Secondary response
    const response = await fetch(`${urlMaker(amount,name,type,itemRarity)}`);
  //Check
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  //Secondary response necessary data
    const data = await response.json();
    const nextpage = data.data;
    const totalCount = data.meta.count;
    const params = new DrupalJsonApiParams()
    .addFields("node--artifact", ["title","path","uid","field_description","field_rarity","field_requires_attunement","field_type"])
    .addInclude(["node_type","field_rarity","field_type"])
    .addPageLimit(limit)
    .addPageOffset(offset)
    .addFilter("field_rarity.name",itemRarity)
    .addFilter("field_type.name",type)
    .addFilter("title",name)
    //.addFilter()
    ;

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--artifact",
      context,
      {
        params: params.getQueryObject()
      }
    );
    const types = await drupal.getResourceCollection<DrupalTaxonomyTerm>(
      "taxonomy_term--item_type",
    )
    const rarity = await drupal.getResourceCollection<DrupalTaxonomyTerm>(
      "taxonomy_term--magic_item_rarity",
    )

    return {
      props: {
        nodes,
        nextpage,
        totalCount,
        terms:{
          types: types.map((e)=>(e.name)),
          rarity: rarity.map((e)=>(e.name))
        }
      },
    };
  }

export default Page;