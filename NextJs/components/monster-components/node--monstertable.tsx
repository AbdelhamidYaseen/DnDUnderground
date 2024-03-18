import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import monsterStyles from "/styles/monsters.css/monsterstable.module.scss";
import Link from "next/link";
import exp from "constants";
import { Dispatch, SetStateAction, useState } from "react";

import base from "/styles/layout.css/layout.module.scss";

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

export const MonsterTable = ({data, useStates, filters}) => {
    const [searchOpen, setSearchOpen] = useState(true);
    const [sort, setSort] = useState("cr");
    

    data.sort((val1, val2) => {
        if (sort === "cr") {
        return val1.data.cr - val2.data.cr;
        }
        if (sort === "name") {
        return val1.data.name.localeCompare(val2.data.name);
    }
    });
    
    const uniqueValues = Array.from(new Set([
        ...filters.types.map(node => node),
    ]));
    const uniqueSizes = Array.from(new Set([
        ...filters.sizes.map(node => node),
    ]));

    return (
        <div className={monsterStyles.Container}>
            <div className={`${monsterStyles.Search} ${searchOpen ? monsterStyles.Search : monsterStyles.SmallerSearch}`}>
            <div className={monsterStyles.InnerSearch}>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Monster Name</label>
                <input type="search" className={monsterStyles.Input} value={useStates.filterName} onChange={e=>useStates.setFilterName(e.target.value)}/>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Challenge Rating</label>
                <input type="search"  className={monsterStyles.Input} value={useStates.filtercr} onChange={e=>useStates.setFilterCr(e.target.value)}/>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Monster Type</label>
                <select className={monsterStyles.Input}value={useStates.filterTags} onChange={e=>useStates.setFilterTags(e.target.value)}>
                <option defaultValue={""} value={""}>-- none --</option>
                {
                    uniqueValues.map((e)=>(
                    <option key={e}>{e}</option>
                    ))
                }
                </select>
            </div>
            <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                <label htmlFor="">Monster Size</label>
                <select className={monsterStyles.Input}value={useStates.filterSizes} onChange={e=>useStates.setFilterSizes(e.target.value)}>
                <option defaultValue={""} value={""}>-- none --</option>
                {
                    uniqueSizes.map((e)=>(
                    <option key={e}>{e}</option>
                    ))
                }
                </select>
            </div>
            </div>
            <div className={monsterStyles.Interactor}>
                <div className={`${monsterStyles.InputDiv} ${searchOpen ? monsterStyles.InputDiv : monsterStyles.HiddenMenu}`}>
                        <label htmlFor="">Page Amount: {useStates.limit}</label>
                        <input type="range" min={5} max={50} className={monsterStyles.Range}value={useStates.limit} onChange={e=>useStates.setLimit(e.target.value)}>
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

            data
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