/*
    * Custom error page for (forbidden access)
    * Automatically renders when 403 error has occered
*/

const Page = () =>{

    return(
        <div style={{display:"flex", justifyContent:"center",alignItems:"center", height:"79vh"}}>
            <h1>
                You are forbidden from entering this realm. Please remove yourself from this before you are <b>Removed</b>  
            </h1>
        </div>
    )
}

export default Page;