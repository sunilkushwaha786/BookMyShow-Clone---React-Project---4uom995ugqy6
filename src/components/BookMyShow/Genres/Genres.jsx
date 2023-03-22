import React from 'react'
import '../Genres/Genres.css'

export function Genres(props) {
    const unOrderList = (arr) => {
      return <ul key="unorderedList">
        {arr.map((item) => {
          return <li onClick={() => {checkGenresCheck(item)}} key={'li'+item.id} id={item.id} >{item.name}</li>
        })}
      </ul>
    }

    const checkGenresCheck = (argGenres) => {
      props.newApicall(argGenres);
    } 

  return (
    <div className='content'>
      <h2>{props.heading}</h2>
      {props.apiData === null ? "" : unOrderList(props.apiData)}
    </div>
  )
}
