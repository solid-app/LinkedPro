import styled from "styled-components";

import { followByWebId,  } from "../App/solid";
/*________________________________________________________________________________*/

const Rightside = (props) => {

function  followByWebIdText(){
  const webId = document.getElementById("webId").value;
    if(webId!=""){
      followByWebId(webId);
    }else{
      alert("WebId is empty");
    }
  }

  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>People you might follow</h2>
        </Title>

        <FeedList>
          <li>
            <Actor>
                <a href="/feed">
                  <img
                    src="https://kkurniawan.solidcommunity.net/profile/kabulkurniawan.jpg"
                    alt="user" 
                   />
                  <div className="info">
                    <h6 className="name">Kabul Kurniawan
                    </h6>
                  <span className="title">Creator LinkedPro
                  </span>
                  </div>
                  
                </a>
                <button onClick={() => followByWebId("https://kkurniawan.solidcommunity.net/profile/card#me") }>
                <img src="/Images/plus-icon.svg" alt="plus" />
                Follow
              </button>
            </Actor>
          </li>

        </FeedList>
        </FollowCard>
        <FollowCard>
        <Title>
          <h2>Follow people by WebId</h2>
        </Title>

        <FeedList>
          <li>
            <Actor>
              <InputContainer>
                <input type="text" id="webId" className="reactinput" placeholder="WebId" />
              </InputContainer>
                <button onClick={() => followByWebIdText()}>
                <img src="/Images/plus-icon.svg" alt="plus" />
                Follow
              </button>
            </Actor>
          </li>

        </FeedList>

        
        
      </FollowCard>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/Images/feed-icon.svg" alt="" />
        </Title>

        <FeedList>
          <li>
            <a href="/feed">
              <Avatar />
            </a>
            <div>
              <span>#Music</span>
              <button>
                <img src="/Images/plus-icon.svg" alt="plus" />
                Follow
              </button>
            </div>
          </li>
          <li>
            <a href="/feed">
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>
                <img src="/Images/plus-icon.svg" alt="plus" /> Follow
              </button>
            </div>
          </li>
        </FeedList>

        <Recommendation>
          View all recommendations
          <img src="/Images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
    </Container>
  );
};
export default Rightside;

/*________________________________________________________________________________*/
const InputContainer = styled.div`
  .reactinput {
    border-radius: 21px;
    border-color: rgb(234, 234, 234);
    font-size: 15px;
    font-family: sans-serif;
    font-weight: 400;
    max-height: 100px;
    min-height: 20px;
    outline: none;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    z-index: 1;
    width: 100%;
    user-select: text;
    padding: 9px 12px 11px;
    text-align: left;
}
`;


const Container = styled.div`
  grid-area: rightside;
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
const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
  .about {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-top: 5px;
    h4 {
      font-size: 14px;
    }
  }

  .pic {
    height: 60px;
    width: 60px;
  }
  .about p {
    font-size: 13px;
    padding-top: 5px;
  }
  
`;
/*_________________________________________*/
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16.5px;
  width: 100%;
  h2 {
    color: #333;
    font-weight: 700;
  }
  
`;
/*_________________________________________*/
const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
      text-align: start;
      gap: 4px;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      border: none;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
      font-size: 16px;
      transition: 0.2s;
      cursor: pointer;
      img {
        margin-right: 5px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.6);
      }
    }
  }
`;
/*_________________________________________*/
const Avatar = styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 45px;
  height: 45px;
  margin-right: 8px;
`;
/*_________________________________________*/
const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;
/*_________________________________________*/
const BannerCard = styled(FollowCard)`
  position: sticky;
  top: 75px;
  img {
    width: 100%;
    height: 100%;
  }
`;
/*________________________________________________________________________________*/
