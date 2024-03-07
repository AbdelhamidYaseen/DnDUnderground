import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import monsterStyles from "/styles/monsters.css/monsterstable.module.scss";
import Link from "next/link";
import exp from "constants";

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
    return (
        <div className={monsterStyles.Container}>
            <div className={monsterStyles.TableHead}>
                <div className={monsterStyles.TableHeadItem}>CR</div>
                <div className={monsterStyles.TableHeadItem}>NAME</div>
                <div className={monsterStyles.TableHeadItem}>TYPE</div>
                <div className={`${monsterStyles.TableHeadItem} ${monsterStyles.Size}`}>SIZE</div>
                <div className={`${monsterStyles.TableHeadItem} ${monsterStyles.Alignment}`}>ALIGNMENT</div>
            </div>
            {props.data.map((monster, index) => (
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