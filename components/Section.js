 import Card from "./Card"
 
 export default function Section ({genre, videos}){
    // console.log('soy videos',videos)
    return (
        <div className = 'section'>
            <h3>{genre}</h3>
            <div>
                {videos.map((video)=>{
                  return  (<a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail}/>
                    </a>)
                })}
            </div>
            
        </div>
    )
 }