import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import monsterStyles from "/styles/monsters.css/monsterstable.module.scss";
import Link from "next/link";
import exp from "constants";
import { useState } from "react";

interface MonsterTableData {
    data:{
        cr: number,
        name: string,
        type: string,
        size: string,
        alignment: string, // Corrected the spelling of "alignment"
        path:string
    }
}

interface MonsterRowData {
    
    cr: number,
    name: string,
    type: string,
    size: string,
    alignment: string, // Corrected the spelling of "alignment"
    path:string

}

const MonsterRow = (props: MonsterRowData) => {
    return (
        <Link href={`/wiki/monsters${props.path}`} className={monsterStyles.MonsterRow}>
            <div className={monsterStyles.MonsterRowItem}>
                {props.cr}
            </div>
            <div className={monsterStyles.MonsterRowItem}>
                {props.name}
            </div>
            <div className={monsterStyles.MonsterRowItem}>
                {props.type}
            </div>
            <div className={`${monsterStyles.MonsterRowItem} ${monsterStyles.Size}`}>
                {props.size}
            </div>
            <div className={`${monsterStyles.MonsterRowItem} ${monsterStyles.Alignment}`}>
                {props.alignment}
            </div>
        </Link>
    )
}

export const MonsterTable = (props: { data: MonsterTableData[] }) => {
    const [searchOpen, setSearchOpen] = useState(true);
    const [sort, setSort] = useState("cr");
    const [filterName, setFilterName] = useState<string>("");
    const [filtercr, setFilterCr] = useState<string>("");
    const [filterTags, setFilterTags] = useState<string>("");
    const [filterSizes, setFilterSizes] = useState<string>("");

    props.data.sort((val1, val2) => {
        if (sort === "cr") {
        return val1.data.cr - val2.data.cr;
        }
        if (sort === "name") {
        return val1.data.name.localeCompare(val2.data.name);
    }
    });
    
    const uniqueValues = Array.from(new Set([
        ...props.data.map(node => node.data.type),
    ]));
    const uniqueSizes = Array.from(new Set([
        ...props.data.map(node => node.data.size),
    ]));

    return (
        <div className={monsterStyles.Container}>
            <div className={`${monsterStyles.Search} ${searchOpen ? monsterStyles.Search : monsterStyles.SmallerSearch}`}>

            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Monster Name</label>
                <input type="search" className={monsterStyles.Input} value={filterName} onChange={e=>setFilterName(e.target.value)}/>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Challenge Rating</label>
                <input type="search"  className={monsterStyles.Input} value={filtercr} onChange={e=>setFilterCr(e.target.value)}/>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Monster Type</label>
                <select className={monsterStyles.Input}value={filterTags} onChange={e=>setFilterTags(e.target.value)}>
                <option selected value={""}>-- none --</option>
                {
                    uniqueValues.map((e)=>(
                    <option key={e}>{e}</option>
                    ))
                }
                </select>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Monster Size</label>
                <select className={monsterStyles.Input}value={filterSizes} onChange={e=>setFilterSizes(e.target.value)}>
                <option selected value={""}>-- none --</option>
                {
                    uniqueSizes.map((e)=>(
                    <option key={e}>{e}</option>
                    ))
                }
                </select>
            </div>


            <div className={`${monsterStyles.CollapseButton} ${searchOpen ? monsterStyles.CollapseButton : monsterStyles.RotatedButton}`} onClick={()=>setSearchOpen(!searchOpen)}>
            ^
            </div>
    
            </div>
            <div className={monsterStyles.TableHead}>
                <div className={monsterStyles.TableHeadItem}
                    onClick={e=>setSort("cr")}
                    style={{cursor:"pointer"}}                
                >CR</div>
                <div className={monsterStyles.TableHeadItem}
                    onClick={e=>setSort("name")}
                    style={{cursor:"pointer"}}
                >NAME</div>
                <div className={monsterStyles.TableHeadItem}>TYPE</div>
                <div className={`${monsterStyles.TableHeadItem} ${monsterStyles.Size}`}>SIZE</div>
                <div className={`${monsterStyles.TableHeadItem} ${monsterStyles.Alignment}`}>ALIGNMENT</div>
            </div>
            {
            props.data
            
            .filter((e)=> {if(e.data.name.toUpperCase().includes(filterName.toUpperCase())){return true}})

            .filter((e)=> {if(e.data.cr.toString() == filtercr || filtercr == ""){return true}})

            .filter((e)=> {if(e.data.type == filterTags || filterTags == ""){return true}})

            .filter((e)=> {if(e.data.size == filterSizes || filterSizes == ""){return true}})


            .map((monster, index) => (
                <MonsterRow
                    key={index}
                    cr={monster.data.cr}
                    name={monster.data.name}
                    type={monster.data.type}
                    size={monster.data.size}
                    alignment={monster.data.alignment} 
                    path={monster.data.path}                
                />
            ))}
        </div>
    )
}