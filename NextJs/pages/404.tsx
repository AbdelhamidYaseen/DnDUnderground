/*
    * Custom error page (non existent page)
    * Generates when you try to go to a page that does not exist
*/
const Page = () =>{

    return(
        <div style={{display:"flex", justifyContent:"center",alignItems:"center", height:"79vh"}}>
            <h1>
                You have reached the end of existence. Nothing exists here.
            </h1>
        </div>
    )
}

export default Page;