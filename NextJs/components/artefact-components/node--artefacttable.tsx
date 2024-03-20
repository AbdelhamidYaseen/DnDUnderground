
import { useState } from "react";
import artefactStyles from "/styles/artefact.css/artefact.module.scss";
import Link from "next/link";
import monsterStyles from "/styles/monsters.css/monsterstable.module.scss";

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

export const ArtefactTable = ({data,useStates,filters}) =>{
    const [searchOpen, setSearchOpen] = useState(true);
    const [sort, setSort] = useState("title");
    data.sort((val1, val2) => {
        if (sort === "title") {
            return val1.data.title.localeCompare(val2.data.title);
        }
        if (sort === "type") {
        return val1.data.type.localeCompare(val2.data.type);
        }
        if (sort === "rarity") {
            return val1.data.rarity.localeCompare(val2.data.rarity);
        }    
    });
    const uniqueTypes = Array.from(new Set([
        ...filters.type.map(node => node),
    ]));
    const uniqueRarities = Array.from(new Set([
        ...filters.rarity.map(node => node),
    ]));


    return(
        <div className={artefactStyles.Container}>

            

<div className={`${monsterStyles.Search} ${searchOpen ? monsterStyles.Search : monsterStyles.SmallerSearch}`}>
            <div className={monsterStyles.InnerSearch}>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Item Name</label>
                <input type="search" className={monsterStyles.Input} value={useStates.filterName} onChange={e=>useStates.setFilterName(e.target.value)}/>
            </div>

            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Item Type</label>
                <select className={monsterStyles.Input}value={useStates.filterType} onChange={e=>useStates.setFilterType(e.target.value)}>
                <option defaultValue={""} value={""}>-- none --</option>
                {
                    uniqueTypes.map((e)=>(
                    <option key={e}>{e}</option>
                    ))
                }
                </select>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Item Rarity</label>
                <select className={monsterStyles.Input}value={useStates.filterRarity} onChange={e=>useStates.setFilterRarity(e.target.value)}>
                <option defaultValue={""} value={""}>-- none --</option>
                {
                    uniqueRarities.map((e)=>(
                    <option key={e}>{e}</option>
                    ))
                }
                </select>
            </div>
            </div>
            <div className={monsterStyles.Interactor}>
                <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                        <label htmlFor="">Page Amount: {useStates.limit}</label>
                        <input type="range" step={5} min={5} max={50} className={monsterStyles.Range}value={useStates.limit} onChange={e=>useStates.setLimit(e.target.value)}>
                        </input>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
            <div  onClick={useStates.handleFilters} className={monsterStyles.SearchButton}>Search</div>
            </div>
            </div>
            <div className={`${monsterStyles.CollapseButton} ${searchOpen ? monsterStyles.CollapseButton : monsterStyles.RotatedButton}`} onClick={()=>setSearchOpen(!searchOpen)}>
            ^
            </div>

            </div>
            

            <div className={artefactStyles.TableHead}>
                <div className={artefactStyles.TableHeadItem}
                    onClick={e=>setSort("title")}
                    style={{cursor:"pointer"}}                
                >NAME</div>
                <div className={artefactStyles.TableHeadItem}
                    onClick={e=>setSort("type")}
                    style={{cursor:"pointer"}}
                >TYPE</div>
                <div className={artefactStyles.TableHeadItem}
                    onClick={e=>setSort("rarity")}
                    style={{cursor:"pointer"}}
                    >RARITY</div>
            </div>
            {
            data
            
            //.filter((e)=> {if(e.data.title.toUpperCase().includes(filterName.toUpperCase())){return true}})

            //.filter((e)=> {if(e.data.cr.toString() == filtercr || filtercr == ""){return true}})

            //.filter((e)=> {if(e.data.type == filterTags || filterTags == ""){return true}})

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