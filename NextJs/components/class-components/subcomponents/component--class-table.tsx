import classStyles from "/styles/class.css/class.module.scss";

interface TableRowProps{
    tabledata: string[]
}

interface TableProps{
    tablehead: TableRowProps[],
    tablerow: TableRowProps[]
}


export const Table = (props:TableProps) =>{
    //console.log(props.tablehead)
    //console.log(props.tablerow)
    return(
        <div style={{padding:"0.5rem"}} className={classStyles.Wrapper}>
            <table className={classStyles.Table}>
                <thead className={classStyles.TableHead}>
                    <tr className={classStyles.TableRow}>
                        {props.tablehead.map((e:any)=>(
                            <th key={""} className={classStyles.TableHeader}>
                                {e}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={classStyles.TableBody}>
                    {
                        props.tablerow.map((e:any)=>(
                            <tr key={""} className={classStyles.TableRow}>
                                {
                                    e.slice(0,-1).map((f)=>(
                                        <td key="">
                                            {f}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}