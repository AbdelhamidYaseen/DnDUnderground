/*
  * Monsters page
  * Renders all monsters nodes
  * Requires getStaticProps to run && the endpoint to exist else it will crash
*/
import { Layout } from "components/layout";
import { MonsterTable } from "components/monster-components/node--monstertable";
import { drupal } from "lib/drupal";
import next, { GetServerSidePropsResult, GetStaticPathsContext, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalTaxonomyTerm, DrupalView } from "next-drupal";
import Head from "next/head";
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import path from "path";
import { useEffect, useState } from "react";
import base from "/styles/layout.css/layout.module.scss";
import { useRouter } from "next/router";
import { clear } from "console";
import { link } from "fs";


interface IndexPageProps {
    nodes: DrupalNode[],
    nextpage: any[],
    totalCount: number,
    terms:{
      sizes:string[],
      tags:string[]
    }
}

export default function Page ({nodes, nextpage,totalCount, terms}:IndexPageProps){
  
  const [filterName, setFilterName] = useState<string>("");
  const [filterCr, setFilterCr] = useState<string>("");
  const [filterTags, setFilterTags] = useState<string>("");
  const [filterSizes, setFilterSizes] = useState<string>("");
  const [limit, setLimit] = useState<string>(""||"15");

  const router = useRouter();
  const { page } = router.query;
  const {amount} = router.query

  /*Functionality Search & Filters*/
  const handleFilters = () => {
    const filters = {
      size: filterSizes,
      tag: filterTags,
      cr: filterCr,
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
                <title>The Beastiary</title>
                <meta
                    name="description"
                    content="An overview of all monsters."
                />
            </Head>

            <div style={{padding: "1rem"}}>
                <div className={base.pageheadercontainer}>
                    <h1 className={base.pageheader} >Monsters {filterName}
                    </h1>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:'15px'}}>


                    </div>
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
                      ))]}
                      useStates={{                        
                        filterName: filterName,
                        setFilterName: setFilterName,
                        filterCr: filterCr,
                        setFilterCr: setFilterCr,
                        filterTags: filterTags,
                        setFilterTags: setFilterTags,
                        filterSizes: filterSizes,
                        setFilterSizes: setFilterSizes,
                        limit: limit,
                        setLimit: setLimit,
                        handleFilters: handleFilters
                      }}
                      filters={{
                        sizes: terms.sizes,
                        types: terms.tags
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
    const urlMaker = (size:string,type:string,cr:string,name:string,amount:string)=>{
      let url = `http://127.0.0.1:59001/jsonapi/node/monster?page[offset]=${(page) * limit}`
      if(amount != null){
        url += `&page[limit]=${limit}`
      }
      if(size != null){
        url += `&filter[field_monster_base_values.field_size.name]=${size}`
      }
      if(type != null){
        url += `&filter[field_monster_base_values.field_type.name]=${type}`
      }
      if(cr != null){
        url += `&filter[field_monster_base_values.field_challenge_rating]=${cr}`
      }
      if(name != null){
        url += `&filter[title]=${name}`
      }
      return url;
    }
    const size : string = query.size;
    const type : string = query.tag;
    const cr : string = query.cr;
    const name: string = query.name;
    const amount:string = query.amount || 15

  //limit & offset
    const limit = parseInt(amount);
    const offset = (page - 1) * limit;
  //Secondary response
    const response = await fetch(`${urlMaker(size,type,cr,name,amount)}`);
  //Check
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  //Secondary response necessary data
    const data = await response.json();
    const nextpage = data.data;
    const totalCount = data.meta.count;
  //Main data fetch & Parameters
    const params = new DrupalJsonApiParams()
    .addFields("node--monster", ["title","body","path","uid","field_monster_base_values"])
    .addInclude(["node_type", "revision_uid", "uid,field_monster_base_values.field_aligment", "field_monster_base_values.field_size", "field_monster_base_values.field_aligment", "field_monster_base_values.field_type"])
    .addFilter("field_monster_base_values.field_size.name",size)
    .addFilter("field_monster_base_values.field_type.name",type)
    .addFilter("field_monster_base_values.field_challenge_rating",cr)
    .addFilter("title",name)
    .addPageLimit(limit)
    .addPageOffset(offset)
    ;
  //Collection fetch // creation
    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--monster",
      context,
      {
        params: params.getQueryObject()
      }
    );
  //Taxonomy Items Fetch
    const sizes = await drupal.getResourceCollection<DrupalTaxonomyTerm>(
      "taxonomy_term--size",
    )
    const tags = await drupal.getResourceCollection<DrupalTaxonomyTerm>(
      "taxonomy_term--monster_type",
    )
    return {
      props: {
        nodes,
        nextpage,
        totalCount,
        terms:{
          sizes: sizes.map((e)=>(e.name)),
          tags: tags.map((e)=>(e.name))
        }
      },
    };
}