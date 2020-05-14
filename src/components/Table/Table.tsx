import React from 'react'
import './style.css'
import wait from '../resources/wait.gif'


interface RowInterface {
    fileName:string,
    result:string,
    url_pdf:string,
    url_json:string,
    url_text:string,
}

interface PropInterface {
    rows:RowInterface[]
}

export const Table = (props:PropInterface) => {

    const rowSelector = (fileName:string,result:string,url_pdf:string,url_json:string,url_text:string,index:number) => {
        if(index === 0) {
            return (
                <div className="row" key={index}>
                    <p>{fileName}</p>
                    <p>{result}</p>
                </div>
                )
        }
        else {
            if(fileName.length > 40)
                fileName = fileName.substring(0,40)+"..."
            return (
                <div className="row" key={index}>
                    <p>{fileName}</p>
                    {result !== "Download" ? <img src={wait} alt={result}/>: <div>
                                                                                <a href={url_pdf} target="_blank" rel="noopener noreferrer"><button className='styledButton pure-button'>pdf</button></a>
                                                                                <a href={url_json} target="_blank" rel="noopener noreferrer"><button className='styledButton pure-button'>text</button></a>
                                                                                <a href={url_text} target="_blank" rel="noopener noreferrer"><button className='styledButton pure-button'>json</button></a>
                                                                            </div>}
                </div>
            )
        }
    }
            


    const rowList = props.rows.map((row,index) => 
            rowSelector(row.fileName,row.result,row.url_pdf,row.url_json,row.url_text,index)
    )

    return (
        <div className="table-container">
            <div className="table">
                {rowList}
            </div>
        </div>
        
        
    )
}                                                                                                                                 