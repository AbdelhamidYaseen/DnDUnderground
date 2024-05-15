import { Layout } from "components/layout";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { drupal } from "lib/drupal";
import { GetServerSidePropsResult } from "next";
import { DrupalNode } from "next-drupal";
import Head from "next/head";
import base from "/styles/layout.css/layout.module.scss";
import { Condition } from "components/condition-components/node--condition";
import { Feat } from "components/feat-components/node--feat";
import { useRouter } from "next/router";

interface IndexPageProps {
  nodes: DrupalNode[];
  nextpage:any[],
  totalCount:number
}

const Page = ({nodes,nextpage,totalCount}:IndexPageProps) => {
          /*Pagination Functionality*/
          const router = useRouter();
          const { page } = router.query;
          const {amount} = router.query

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

  return (
    <Layout>
      <Head>
        <title>Feats</title>
        <meta name="description" content="An overview of all feats" />
      </Head>
        
      <div style={{ padding: "1rem" }}>
        <div className={base.pageheadercontainer}>
          <h1 className={base.pageheader}>Feats </h1>
          <hr
            style={{
              border: "solid darkblue 2px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "85%",
            }}
          />
        </div>



        <div style={{ marginLeft: "auto", marginRight: "auto", width: "85%" }}>
            {nodes.map((e)=>(
                <Feat 
                key={e.title}
                title={e.title} 
                description={e.body.value} 
                prerequisites={e.field_prerequisites} 
                effect={[...e.field_effects.map((f)=>(f.field_effect))]}/>
            ))}
        </div>



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
    </Layout>
  );
};

export async function getServerSideProps(
  context
): Promise<GetServerSidePropsResult<IndexPageProps>> {
  //query
  const { query } = context;
  const page = query.page ? parseInt(Array.isArray(query.page) ? query.page[0] : query.page) : 1;
    const amount:string = query.amount || 15
  //Secondary response necessary data
  const urlMaker = (amount:string)=>{
    let url = `http://127.0.0.1:59001/jsonapi/node/feats?page[offset]=${(page) * limit}`
    if(amount != null){
      url += `&page[limit]=${limit}`
    }
    return url;
  }



    //limit & offset
    const limit = parseInt(amount);
    const offset = (page - 1) * limit;

    const response = await fetch(`${urlMaker(amount)}`);
    const data = await response.json();
    const nextpage = data.data;
    const totalCount = data.meta.count;
  
  const params = new DrupalJsonApiParams()
    .addFields("node--feats", [
      "title",
      "path",
      "uid",
      "body",
      "field_effects",
      "field_prerequisites"
    ])
    .addInclude(["field_effects.paragraph_type"])
    .addPageLimit(limit)
    .addPageOffset(offset)


  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--feats",
    context,
    {
      params: params.getQueryObject(),
    }
  );

  return {
    props: {
      nodes,
      totalCount,
      nextpage
    },
  };
}

export default Page;
