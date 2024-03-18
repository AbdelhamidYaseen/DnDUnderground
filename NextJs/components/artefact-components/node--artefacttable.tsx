
import { useState } from "react";
import artefactStyles from "/styles/artefact.css/artefact.module.scss";
import Link from "next/link";

interface ArtefactTableData {
    data:{
        title:string,
        desc:string,
        rarity:string,
        attunement:string,
        type:string,
        path:string

    }
}

interface ArtefactRowData {
    
    title:string,
    desc:string,
    rarity:string,
    attunement:string,
    type:string,
    path:string

}


const ArtefactRow = (props: ArtefactRowData) => {
    return (
        <Link href={`/wiki/artefacts${props.path}`} className={artefactStyles.ArtefactsRow}>
            <div className={artefactStyles.ArtefactsRowItem}>
                {props.title}
            </div>
            <div className={artefactStyles.ArtefactsRowItem}>
                {props.type}
            </div>
            <div className={artefactStyles.ArtefactsRowItem}>
                {props.rarity}
            </div>
        </Link>
    )
}

export const ArtefactTable = (props: { data: ArtefactTableData[] }) =>{
    const [searchOpen, setSearchOpen] = useState(true);
    const [sort, setSort] = useState("title");
    const [filterName, setFilterName] = useState<string>("");
    const [filtercr, setFilterCr] = useState<string>("");
    const [filterTags, setFilterTags] = useState<string>("");
    const [filterSizes, setFilterSizes] = useState<string>("");
    console.log(props.data)
    return(
        <div className={artefactStyles.Container}>
            <div className={artefactStyles.TableHead}>
                <div className={artefactStyles.TableHeadItem}
                    onClick={e=>setSort("title")}
                    style={{cursor:"pointer"}}                
                >NAME</div>
                <div className={artefactStyles.TableHeadItem}
                    onClick={e=>setSort("type")}
                    style={{cursor:"pointer"}}
                >TYPE</div>
                <div className={artefactStyles.TableHeadItem}>RARITY</div>
            </div>
            {
            props.data
            
            .filter((e)=> {if(e.data.title.toUpperCase().includes(filterName.toUpperCase())){return true}})

            //.filter((e)=> {if(e.data.cr.toString() == filtercr || filtercr == ""){return true}})

            .filter((e)=> {if(e.data.type == filterTags || filterTags == ""){return true}})

            //.filter((e)=> {if(e.data.size == filterSizes || filterSizes == ""){return true}})


            .map((artefact, index) => (
                <ArtefactRow
                    key={index}
                    path={artefact.data.path} 
                    title={artefact.data.title} 
                    desc={artefact.data.desc} 
                    rarity={artefact.data.rarity} 
                    attunement={artefact.data.attunement} 
                    type={artefact.data.type}                
                    />
            ))}
        </div>
    )
}