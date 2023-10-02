import { initialize, deletePost, fetchLikes,getPostLike, 
        handleRedirectAfterLogin,getProfile, getPosting } from "../App/solid";
import { VCARD} from "@inrupt/vocab-common-rdf"; 
import fuzzyTime from "fuzzy-time";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import PostModel from "./PostModel";
import Comment from "./Comment";
import {getStringNoLocale, getUrl} from "@inrupt/solid-client";
import ReactPlayer from "react-player";

const Main = () => {
   const [showUser, setShowUser] = useState(false);
   const [showModel, setShowModel] = useState(false);
   const [showComments, setShowComments] = useState([]);
   const [showEditPost, setShowEditPost] = useState(false);
  const [posting, setPosting] = useState([]);
   const [profile, setProfile] = useState(false);
   const [webId, setWebId] = useState(false);
   const [isLoading, setIsLoading] = useState(true); 



   const isUrlExist = (giventText) => {
    
    let ma = giventText.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
    //console.log(giventText +" "+ma);
    if (ma!=null && ma.length > 0) {
      return true;
    }else{
      return false;
    }  
  }

  const hideModel = () => {
    setShowModel(false);
  };

const uploadPost = useCallback(
    (post) => {
    },
  );

useEffect(() => {
  const showProfile = async () =>{
    const session = await handleRedirectAfterLogin();
     if(session.info.isLoggedIn){
      const webId = session.info.webId;
      setWebId(webId);
      initialize(webId);
      setProfile(await getProfile(webId));
      setPosting(await getPosting(webId));
      setIsLoading(false);
     }    
}
showProfile();
}, []);


  return (
    <Container>
       <input type="hidden" id="web-id" value="" />
      <ShareBox>
        <div>
          <img  src={profile ? getUrl(profile, VCARD.hasPhoto) : "/Images/user.svg"}
            alt="user"
            />
          <button onClick={() => setShowModel(true)}>Start a post</button>
        </div>
        <div>
          <button onClick={() => setShowModel(true)}>
            <img src="/Images/photo-icon.svg" alt="pic" />
            <span>Photo</span>
          </button>
          <button onClick={() => setShowModel(true)}>
            <img src="/Images/vedio-icon.svg" alt="vedio" />
            <span>Video</span>
          </button>
          <button onClick={() => setShowModel(true)}>
            <img src="/Images/job-icon.svg" alt="job" />
            <span>Job</span>
          </button>
          <button onClick={() => setShowModel(true)}>
            <img src="/Images/article-icon.svg" alt="article" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
       {isLoading ? (
          <CenteredLoaderContainer>
          <Loader />
        </CenteredLoaderContainer>
      ) : (
    <Container1>
     

      <input type="hidden" id="web-id" value="" />
      {posting.length > 0 &&
        posting.map((post, id) => {
          return (
            <Article key={id}>
              <Actor>
                <a href="/feed">
                  <img
                    src={profile ? post.profile[0].photo : "/Images/user.svg"}
                    alt="user" />
                  <div className="info">
                    <h6 className="name">
                    {post.profile[0].name}
                    </h6>
                  <span className="title">
                      {post.profile[0].role}
                  </span>
                  <span className="date">
                      {fuzzyTime(post.date)}
                      <li-icon aria-hidden="true" type="globe-americas" class="v-align-bottom" size="small"></li-icon>
                  </span>
                  </div>
                </a>
                <button
                onClick={() =>
                  setShowEditPost((prev) => (prev === post.subject ? null : post.subject))
                }
              >
                <img src="/Images/ellipsis.svg" alt="ellipsis" />
              </button>
              {showEditPost === post.subject && (
                <EditModel>
                  <li>
                    <img src="/Images/firebase.png" alt="saved" />
                    <div className="info">
                      <h6>Save</h6>
                      <span>Save for later</span>
                    </div>
                  </li>
                  {/* {console.log(post.profile[0].webId+"#me")} */}
                  {post.profile[0].webId === webId && (
                    <li onClick={() => deletePost(post.subject)}>
                      <img src="/Images/delete.svg" alt="" />
                      <h6>Delete post</h6>
                    </li>
                  )}
                </EditModel>
              )}
              </Actor>
              <Description>{post.desc}</Description>
              <SharedImg>
                
            {isUrlExist(post.desc) && (
              <ReactPlayer
                url={post.desc}
                width={"100%"}
                controls={true}
              />
            )}
              </SharedImg>
              <SocialContents>
              <li>
                {post.like > 0 && (
                  <img
                    src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                    alt="likes"
                  />
                )}
                <span>{post.like}</span>
              </li>
                <li onClick={() => setShowComments((prev) => [...prev, id])}>
                  <p>{post.comment ? post.comment.length : 0} comments</p> 
                </li>
              </SocialContents>
              <SocialActions>
                <button
                className={
                  (post.islike) ? "active" : ""
                }
                onClick={(e) => {
                  fetchLikes(webId, post.subject);
                }}
               >
                  <img className="unLiked" src="/Images/like.svg" alt="like" />
                  <img
                    className="liked"
                    src="https://static-exp1.licdn.com/sc/h/5zhd32fqi5pxwzsz78iui643e"
                    alt="like" />

                  <span>Like</span>
                </button>
                <button onClick={() => setShowComments((prev) => [...prev, id])}>
                  <img src="/Images/comment.svg" alt="comment" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src="/Images/share.svg" alt="share" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/Images/send.svg" alt="send" />
                  <span>Send</span>
                </button>
              </SocialActions>
              {showComments.includes(id) && (
              <Comment

                  photo={getUrl(profile, VCARD.hasPhoto)}
                  comment={post.comment}
                  webId={post.profile[0].webId+"#me"}
                  postID={post.subject}
              />
            )}
            </Article>
          );
        })}
      
      {showModel && (
        <PostModel
          photo={getUrl(profile, VCARD.hasPhoto)}
          name = {getStringNoLocale(profile, VCARD.fn)}
          role = {getStringNoLocale(profile, VCARD.role)}
          close={hideModel}
          addPost={setPosting}
          uploadPost={uploadPost}
        />
      )} 
    </Container1>  
    )}
   <Container2>
   <Content>
        <Logo>
          <a href="/feed">
            <img src="/Images/home-logo.jpg" width="120px" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/Images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <img src="/Images/nav-home.svg"  alt="" />
              <span>Home</span>
            </NavList>
            
            <NavList >
              <img src="/Images/nav-network.svg" alt="" />
              <span>My Network</span>
            </NavList>
            {/* <NavList>
              <img src="/Images/nav-jobs.svg" alt="" />
              <span>Jobs</span>
            </NavList>

            <NavList>
              <img src="/Images/nav-messaging.svg" alt="" />
              <span>Messaging</span>
            </NavList> */}

            <NavList>
              <img src="/Images/nav-notifications.svg" alt="" />
              <span>Notifications</span>
            </NavList>

            <User onClick={() => setShowUser(!showUser)}>
              <img src={profile ? getUrl(profile, VCARD.hasPhoto) : "/Images/user.svg"} id="profile-image-header" alt="user" />
              <span>
                Me
                <img src="/Images/down-icon.svg" alt="" />
              </span>
              {showUser && 
              <Profile 
                photo={getUrl(profile, VCARD.hasPhoto)}
                name = {getStringNoLocale(profile, VCARD.fn)}
                role = {getStringNoLocale(profile, VCARD.role)}
              />}
            </User>

            {/* <Work>
              <img src="/Images/nav-work.svg" alt="" />
              <span>
                Work
                <img src="/Images/down-icon.svg" alt="" />
              </span>
            </Work> */}

          </NavListWrap>
        </Nav>
      </Content>
    
     </Container2>

    </Container>
  );


};
export default Main;


/*________________________________________________________________________________*/
const Container = styled.div`
grid-area: main;
`;
/*________________________________________________________________________________*/
const Container1 = styled.div`
  grid-area: main;
`;
/*_________________________________________*/
const CommonCard = styled.article`
  overflow: hidden;
  text-align: center;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 5px;
  border: none;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
/*_________________________________________*/
const UploadingBox = styled(CommonCard)`
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  color: rgba(0, 0, 0, 0.7);
  position: relative;
  & > img {
    width: fit-content;
  }
  .progress {
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 400px;
    .bar {
      width: 100%;
      height: 8px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.08);
      overflow: hidden;
      position: relative;
      span {
        position: absolute;
        height: 100%;
        background-color: #576779;
      }
    }
    @media (max-width: 768px) {
      width: 230px;
    }
  }
`;
/*_________________________________________*/
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: white;

  div {
    button {
      color: rgba(0, 0, 0, 0.6);
      outline: none;
      border: none;
      background-color: transparent;
      min-height: 48px;
      line-height: 1.5;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      transition: 0.2s;
      padding: 8px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
      }
    }

    &:last-child {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding-bottom: 4px;
      button {
        border-radius: 5px;
        img {
          margin: 0 10px 0 -2px;
        }
      }
    }
  }
`;
/*_________________________________________*/
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
/*_________________________________________*/
const Actor = styled.div`
  padding-right: 40px;
  padding: 12px 16px 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: flex-start;
  position: relative;
  a {
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      text-align: start;
      h6 {
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        font-weight: 600;
      }
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
/*_________________________________________*/
const EditModel = styled.ul`
  animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 55px;
  background-color: white;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);
  border-radius: 8px;
  overflow: hidden;
  z-index: 99;
  min-width: 250px;
  li {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    img {
      width: 18px;
      height: 20px;
    }
    h6 {
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
    }
    .info {
      text-align: start;
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;
/*_________________________________________*/
const Description = styled.div`
  font-size: 14px;
  text-align: start;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
`;
/*_________________________________________*/
const SharedImg = styled.div`
  width: 100%;
  max-height: 500px;
  position: relative;
  background-color: #f9fafb;
  margin-top: 8px;
  overflow: hidden;
  img {
    max-height: 500px;
    max-width: 100%;
  }
`;
/*_________________________________________*/
const SocialContents = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0 16px;
  padding: 8px 0;
  overflow: auto;
  border-bottom: 1px solid #e9e5df;
  font-size: 12px;
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      margin-right: -5px;
      background-color: white;
      border-radius: 50%;
    }
    span {
      margin-left: 8px;
    }
    &:hover {
      color: #0a66c2;
      text-decoration: underline;
    }
  }
`;
/*_________________________________________*/
const SocialActions = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  min-height: 40px;
  overflow: hidden;
  button {
    outline: 0;
    color: rgba(0, 0, 0, 0.6);
    padding: 12px 24px;
    background-color: transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    border: 0;
    border-radius: 5px;
    transition: 0.2s;
    font-weight: 600;
    .liked {
      display: none;
    }
    .unLiked {
      display: inline-block;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    &.active {
      color: #0a66c2;
      .liked {
        display: inline-block;
      }
      .unLiked {
        display: none;
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      padding: 10px;
      margin: 0;
      font-size: 12px;
    }
  }
`;
/*________________________________________________________________________________*/


const Container2 = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
/*___________________________________________________*/
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
/*___________________________________________________*/
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  @media (max-width: 365px) {
    width: 10px;
  }
`;
/*___________________________________________________*/
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      @media (max-width: 767px) {
        width: 205px;
      }
    }
  }
  @media (max-width: 365px) {
    margin-left: 25px;
  }
`;
/*___________________________________________________*/
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/*___________________________________________________*/
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;

    /* box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%); */
  }
`;
/*___________________________________________________*/
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-evenly;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
      @media (max-width: 768px) {
        border: none;
      }
    }
  }
`;
/*___________________________________________________*/
const NavList = styled.li`
  justify-content: center;
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 1.5;
  min-height: 52px;
  min-width: 80px;
  position: relative;
  text-decoration: none;
  span {
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    min-width: 70px;
    font-size: 10.5px;
  }

  &:hover,
  &:active {
    span {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const User = styled(NavList)`
  svg {
    width: 24px;
    border-radius: 50%;
  }
  img:first-of-type {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  img:last-child {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 767px) {
    position: fixed;
    top: 5px;
    right: 0px;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  img:last-child {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const CenteredLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* You can adjust the height as needed */
`;

const Loader = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
  `;
/*________________________________________________________________________________*/
