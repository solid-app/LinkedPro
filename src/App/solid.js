import {getDefaultSession, handleIncomingRedirect, fetch} from "@inrupt/solid-client-authn-browser";
import { SCHEMA_INRUPT, VCARD,RDF, AS,DCTERMS } from "@inrupt/vocab-common-rdf"; 
import { v4 as uuidv4 } from 'uuid';
import {
  getPodUrlAll,
  getSolidDataset,
  getThingAll,
  getThing,
  getStringNoLocale,
  getUrl,
  createSolidDataset,
  createThing,
  addUrl,
  addStringNoLocale,
  saveSolidDatasetAt,
  setThing,
  addDatetime,
  getDatetime,
  removeThing,
} from "@inrupt/solid-client";


/*________________________________________________________________________________*/

export async function handleRedirectAfterLogin() {
  await handleIncomingRedirect({restorePreviousSession:true}); 
  return getDefaultSession();
}

export async function getPostLike(postSubject) {
  let session = getDefaultSession();
  let myWebId = session.info.webId;

   const MyLikeUrl = await getLikeUrl(myWebId);
   const myDataset = await getSolidDataset(MyLikeUrl, { fetch: fetch }  );
   let items = getThingAll(myDataset);
   let ilike = false;

  if(items.length > 0 ){
   for(let i=0;i<items.length;i++){
     const postUrl =  getUrl(items[i], AS.object);
    //  console.log(postUrl +" "+ postSubject);
     if(postUrl === postSubject){
       ilike = true;
     }
   };
 }
 return ilike;
}


 export async function deletePost(postUrl){
  console.log(postUrl);
  let session = getDefaultSession();
  let myWebId = session.info.webId;
  const mypods = await getPodUrlAll(myWebId, { fetch: fetch });
  const myPostsUrl = mypods[0] + "public/posts";
  let myDataset;
  
      try {
        myDataset = await getSolidDataset(myPostsUrl, { fetch: fetch }  );
        let item = getThing(myDataset,postUrl);
        myDataset = removeThing(myDataset, item);
        window.location.reload();
      } catch (error) {
          console.error(error.message);

      }

  
  
 
};
 
export async function getProfile(webId) {
  const myDataset = await getSolidDataset(webId, { fetch: fetch });

  let items = getThing(myDataset,webId);
  
//leftside
if(document.getElementById("profile-photo-left")){
   document.getElementById("profile-photo-left").src = getUrl(items, VCARD.hasPhoto);
}  
if(document.getElementById("profile-name-left")){
document.getElementById("profile-name-left").innerHTML =getStringNoLocale(items, VCARD.fn);
}
if(document.getElementById("profile-photo-profile")){
  document.getElementById("profile-photo-profile").src = getUrl(items, VCARD.hasPhoto);
}
if(document.getElementById("role-left")){
  document.getElementById("role-left").innerHTML = getStringNoLocale(items, VCARD.role) +" at "+ getStringNoLocale(items, VCARD.organization_name);
}


//rightside
if(document.getElementById("webId-right")){
  document.getElementById("webId-right").value = webId;
}

  return items;
}

export async function followByWebId(targetWebId) {
  let session = getDefaultSession();
  let myWebId = session.info.webId;

  const mypods = await getPodUrlAll(myWebId, { fetch: fetch });
  const myFollowsUrl = mypods[0] + "public/follows";
  
let myFollow;

  try {
    // Attempt to retrieve the reading list in case it already exists.
    myFollow = await getSolidDataset(myFollowsUrl, {fetch:fetch});
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
      // if not found, create a new SolidDataset (i.e., the reading list)
      myFollow = createSolidDataset();
        
    } else {
      console.error(error.message);
    }
  }

   const followID = uuidv4();
   let item = createThing({ name: followID});
   item = addUrl(item, RDF.type, AS.Follow);
   item = addStringNoLocale(item, SCHEMA_INRUPT.identifier, followID);
   item = addUrl(item, AS.actor, myWebId);
   item = addUrl(item, AS.object, targetWebId);
   item = addDatetime(item, DCTERMS.created, new Date());
   myFollow = setThing(myFollow, item);

  try {
      // Save the SolidDataset
      let savedFollows = await saveSolidDatasetAt(
        myFollowsUrl,
        myFollow,
        { fetch: fetch }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
    
}

export async function getCommentByPostID(webId, postSubject) {

  let arrWebId = await getFollows();
   arrWebId.push(webId);
   let arr = [];
   for(let n=0;n < arrWebId.length;n++){
  const MyCommentUrl = await getCommentUrl(arrWebId[n]);
    const myDataset = await getSolidDataset(MyCommentUrl, { fetch: fetch }  );
    let items = getThingAll(myDataset);
    
   if(items.length > 0 ){
    for(let i=0;i<items.length;i++){
      const postUrl =  getUrl(items[i], AS.inReplyTo);
      const commentActor = getUrl(items[i], AS.actor);
      const commentProfile = await getProfileByWebId(commentActor);
      //console.log(postUrl +" "+ postSubject);
      if(postUrl === postSubject){
        const cdate = getDatetime(items[i], DCTERMS.created);
        const comment = {desc: getStringNoLocale(items[i], SCHEMA_INRUPT.description),
                        commentID: getStringNoLocale(items[i], SCHEMA_INRUPT.identifier),
                        date: cdate.toISOString(),
                        profile: commentProfile}; 
        arr.push(comment);
      }
    };
  }
}
  return arr;    
};   
 





export async function getLikeByPostID(webId, postSubject) {

  let arrWebId = await getFollows();
   arrWebId.push(webId);
   let countLike = 0;
   for(let n=0;n < arrWebId.length;n++){
    const MyLikeUrl = await getLikeUrl(arrWebId[n]);
    const myDataset = await getSolidDataset(MyLikeUrl, { fetch: fetch }  );
    let items = getThingAll(myDataset);
    
   if(items.length > 0 ){
    for(let i=0;i<items.length;i++){
      const postUrl =  getUrl(items[i], AS.object);
      if(postUrl === postSubject){
        countLike = countLike + 1;
      }
    };
  }
}
  return countLike;    
};   

export async function getProfileByWebId(webId) {
  const myDataset = await getSolidDataset(webId, { fetch: fetch });
  
  let items = getThing(myDataset,webId);

  let arr = [];
   if(items){
        const profile = {name: getStringNoLocale(items, VCARD.fn),
                        role: getStringNoLocale(items, VCARD.role),
                        webId: webId,
                        photo: getUrl(items, VCARD.hasPhoto)}; 
        arr.push(profile);
  }
  return arr;    
};   

export async function createFile(fileUrl) {
  let myRes;
    try {
      myRes = await getSolidDataset(fileUrl, { fetch: fetch });
    } catch (error) {
      if (typeof error.statusCode === "number" && error.statusCode === 404) {
        // if not found, create a new SolidDataset (i.e., the reading list)
        myRes = createSolidDataset();
        const initId = uuidv4();
        let item = createThing({ name: initId});
        myRes = setThing(myRes, item);
            try {
                // Save the SolidDataset
                let savedPosts = await saveSolidDatasetAt(
                  fileUrl,
                  myRes,
                  { fetch: fetch }
                );

              } catch (error) {
                console.log(error);
              };
      } else {
        console.error(error.message);
      }
      console.log(error);
  }
}

export async function initialize(webId) {
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myPostsUrl = mypods[0] + "public/posts";
  const myCommentsUrl = mypods[0] + "public/comments";
  const myLikesUrl = mypods[0] + "public/likes";
  const myFollowsUrl = mypods[0] + "public/follows";

    // Create post dataset
    createFile(myPostsUrl);
    // Create comment dataset
    createFile(myCommentsUrl);
    // Create likes dataset
    createFile(myLikesUrl);
    // Create follows dataset
    createFile(myFollowsUrl);
    
}

export async function getFollows() {
  let session = getDefaultSession();
  let myWebId = session.info.webId;

  const myFollowsUrl = await getFollowsUrl(myWebId);
  const myDataset = await getSolidDataset(myFollowsUrl, { fetch: fetch }  );
  let items = getThingAll(myDataset);
  let arr = [];
  if(items.length > 0){
    for(let i=0;i<items.length;i++){
      const followObject = getUrl(items[i], AS.object);
       arr.push(followObject);
    };
  }
  return arr;    

}



export async function getPosting(webId) {
  
  let arrWebId = await getFollows();
  arrWebId.push(webId);
   
  let arr = [];
  for(let n=0;n < arrWebId.length;n++){
  const mypods = await getPodUrlAll(arrWebId[n], { fetch: fetch });
  
   const myPostsUrl = mypods[0] + "public/posts";
  
   const myDataset = await getSolidDataset(myPostsUrl, { fetch: fetch }  );
    let items = getThingAll(myDataset)
   
    if(items.length > 0){
    for(let i=0;i<items.length;i++){
      const cdate = getDatetime(items[i], DCTERMS.created);
      const postUrl = myPostsUrl+"#"+getStringNoLocale(items[i], SCHEMA_INRUPT.identifier);
      const postActor = getUrl(items[i], AS.actor);  
      //get profile   
      const postProfile = await getProfileByWebId(postActor);
      //get post comment getCommentByPostID
      const postComment = await getCommentByPostID(arrWebId[n], postUrl);
      const postLike = await getLikeByPostID(arrWebId[n], postUrl,webId);
      const likeStatus = await getPostLike(postUrl);
      //put all together
      const post = {
        desc: getStringNoLocale(items[i], SCHEMA_INRUPT.description),
        date: cdate.toISOString().replace("T"," ").substring(0, 19),
        subject: postUrl,
        islike: likeStatus,
        comment: postComment,
        like: postLike,
        profile: postProfile};

      arr.push(post);
      
      }
    }
  }
  //console.log(arr);
  return arr;    
};   

export async function deleteTriple(webId, postID) {
 // alert(postID);
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
   const myPostsUrl = mypods[0] + "public/posts";
     const myDataset = await getSolidDataset(myPostsUrl, { fetch: fetch }  );
    //alert(myPostsUrl+"#"+postID);
    // console.log(myDataset);
    // let items = getThingAll(myDataset);

     //console.log(myPostsUrl+"#"+postID);
    // removeAll(myDataset, asUrl(myPostsUrl+"#"+postID));
};   

export async function getFollowsUrl(webId) {
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myFollowsUrl = mypods[0] + "public/follows";
  return myFollowsUrl;
}


export async function getPostUrl(webId) {
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myPostsUrl = mypods[0] + "public/posts";
  return myPostsUrl;
}

export async function getCommentUrl(webId) {
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myCommentUrl = mypods[0] + "public/comments";
  return myCommentUrl;
}
  
export async function getLikeUrl(webId) {
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myLikeUrl = mypods[0] + "public/likes";
  return myLikeUrl;
}
// export async function addPostCommentAttributeaddPostCommentAttribute(postWebId, postID, webId) {
  

//   const postUrl = await getPostUrl(postWebId);
//   console.log(postID);
  
//    let myPost;
//     myPost = await getSolidDataset(postUrl, {fetch:fetch}); 
//     console.log(myPost);
//     let item = getThing(myPost, postID);
    
//     item = addUrl(item, AS.attributedTo, webId);
//     myPost = setThing(myPost, item);
    
//   try {
//     let savedPosts = await saveSolidDatasetAt(
//       postUrl,
//       myPost,
//       { fetch: fetch }
//     );
//   } catch (error) {
//     console.log(error);
    
//   }
// }


export async function doPosting(webId, post) {
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myPostsUrl = mypods[0] + "public/posts";
  
let myPost;

  try {
    // Attempt to retrieve the reading list in case it already exists.
    myPost = await getSolidDataset(myPostsUrl, {fetch:fetch});
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
      // if not found, create a new SolidDataset (i.e., the reading list)
        myPost = createSolidDataset();
        
    } else {
      console.error(error.message);
    }
  }

   const postID = uuidv4();
   let item = createThing({ name: postID});
   item = addUrl(item, RDF.type, AS.Article);
   item = addStringNoLocale(item, SCHEMA_INRUPT.identifier, postID);
   item = addUrl(item, AS.actor, webId);
   item = addStringNoLocale(item, SCHEMA_INRUPT.description, post);
   item = addDatetime(item, DCTERMS.created, new Date());
   myPost = setThing(myPost, item);
   //console.log(myPost);
  try {
      // Save the SolidDataset
      let savedPosts = await saveSolidDatasetAt(
        myPostsUrl,
        myPost,
        { fetch: fetch }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
  
}

export async function doComment(webId, comment, postID, postWebId) {  
  const mypods = await getPodUrlAll(webId, { fetch: fetch });
  const myCommentUrl = mypods[0] + "public/comments";
  
let myComment;

  try {
    // Attempt to retrieve the reading list in case it already exists.
    myComment = await getSolidDataset(myCommentUrl, {fetch:fetch});
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
         // if not found, create a new SolidDataset (i.e., the reading list)
        myComment = createSolidDataset();
        
    } else {
      console.error(error.message);
    }
  }

   const commentID = uuidv4();
   let item = createThing({ name: commentID});
   item = addUrl(item, RDF.type, AS.Note);
   item = addStringNoLocale(item, SCHEMA_INRUPT.identifier, commentID);
   item = addUrl(item, AS.actor, webId);
   item = addStringNoLocale(item, SCHEMA_INRUPT.description, comment);
   item = addUrl(item, AS.inReplyTo, postID);
   item = addUrl(item, AS.to, postWebId);
   item = addDatetime(item, DCTERMS.created, new Date());
   myComment = setThing(myComment, item);
   try {
      // Save the SolidDataset
      let savedPosts = await saveSolidDatasetAt(
        myCommentUrl,
        myComment,
        { fetch: fetch }
      );    
      window.location.reload();
    } catch (error) {
      console.log(error);
    };

   
}

    export async function fetchLikes(webId, postID) {
      const mypods = await getPodUrlAll(webId, { fetch: fetch });
      const myLikeUrl = mypods[0] + "public/likes";
    let myLike;

    
  try {
    myLike = await getSolidDataset(myLikeUrl, {fetch:fetch});
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
        myLike = createSolidDataset();
    } else {
      console.error(error.message);
    }
  }

   const likeID = uuidv4();
   let item = createThing({ name: likeID});
   item = addUrl(item, RDF.type, AS.Like);
   item = addUrl(item, AS.object, postID);
   item = addUrl(item, AS.actor, webId);
   item = addDatetime(item, DCTERMS.created, new Date());
   myLike = setThing(myLike, item);
   
  try {
      let savedPosts = await saveSolidDatasetAt(
        myLikeUrl,
        myLike,
        { fetch: fetch }
      );
        window.location.reload();
    } catch (error) {
      console.log(error);
    };

};
  