import { gql, GraphQLClient } from "graphql-request";
import { Image } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Section from "../components/Section";

export const getStaticProps = async () => {
  const url = process.env.URL;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.TOKEN,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const accountQuery =  gql`
  query {
    account(where: {id:"cl7dfibd2i4ya0bmqf8yk38w2"}){
      username,
      avatar {
        url
      }
    }
  }
  `

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account
  return {
    props: {
      videos,
      account
    },
  };
};

export default function Home({ videos, account }) {
  // console.log('soy video', videos)
  const randomVideos = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null)
  }

  return (
    <>
    <NavBar account={account}/>
      <div className="app">
        <div className="main-video">
          <Image
            src={randomVideos(videos).thumbnail?.url}
            alt={randomVideos(videos).title}
          />
        </div>

        <div className="video-feed">
        
          <Section genre={"Recommended for You"} videos={unSeenVideos(videos)} />
          <Section genre={"Family"} videos={filterVideos(videos, 'family')} />
          <Section genre={"Animation"} videos={filterVideos(videos, 'animation')}/>
          <Section genre={"Princess"} videos={filterVideos(videos, 'princess')}/>
          <Section genre={"Snow"} videos={filterVideos(videos, 'snow')}/>
          <Section genre={"Kids"} videos={filterVideos(videos, 'kids')}/>
          <Section genre={"Adventure"} videos={filterVideos(videos, 'adventure')}/>
          <Section genre={"Mitology"} videos={filterVideos(videos, 'mitology')}/>
          <Section genre={"Latin"} videos={filterVideos(videos, 'latin')}/>
          <Section genre={"Friends"} videos={filterVideos(videos, 'friends')}/>
          <Section genre={"Classics"} videos={filterVideos(videos, 'classics')}/>
          <Section genre={"Action"} videos={filterVideos(videos, 'action')}/>
          <Section genre={"Superheroes"} videos={filterVideos(videos, 'superheroes')}/>
          <Section genre={"+10"} videos={filterVideos(videos, '+10')}/>
          <Section genre={"Villians"} videos={filterVideos(videos, 'villians')}/>
          <Section genre={"Love"} videos={filterVideos(videos, 'love')}/>
          <Section genre={"Comedy"} videos={filterVideos(videos, 'comedy')}/>
        </div>
      </div>
    </>
  );
}
