export default function Card ({thumbnail}){
    // console.log('soy videos',videos)
    return (
       <img className='card' src={thumbnail?.url} alt={thumbnail?.title}/>
    )
 }