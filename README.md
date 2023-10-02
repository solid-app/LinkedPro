# LinkedPro

A social network platform based On [Solid (Social Linked Data)](https://solidproject.org/) specification. The key difference between another existing social networks platform is it does not collect your data (even a single piece of your data). Instead, any data you have created (posts, comments, likes, follows, etc) are yours, and they are store in your own POD. This means,
* *you create a post, this post is stored in your "post" dataset*.
* *you make a comment of a post, this comment is stored in your "comment" dataset*.
* *you make a like to a post, this like is yours and stored in your "like" dataset*.
* and *so on*.


**_Built using React JS, Node.JS and Solid Client Library_**

[![LinkedPro](https://raw.githubusercontent.com/kabulkurniawan/LinkedPro/main/build/Images/linked-pro-youtube-preview.jpg)](https://www.youtube.com/watch?v=6rRXAcaWLpA)

## Specifications

* [WebID](https://www.w3.org/2005/Incubator/webid/spec/identity/) for personal/agent identities.
* [Web Access Control](https://solidproject.org/TR/wac)/ACL to set permissions on Web resources.
* W3C [Linked Data Platform](http://www.w3.org/TR/ldp/) and [Solid Protocol](https://solidproject.org/TR/protocol) servers to read and write Web resources.
* W3C [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary) and [ActivityPub](https://www.w3.org/TR/activitypub/) for social activities.
* [schema.org](http://schema.org/), [VCARD](https://www.w3.org/TR/vcard-rdf/), [FOAF](http://xmlns.com/foaf/0.1/),  and various other vocabularies.

## Features and Fuctionality

-   Login using Solid POD (via Solid WebID Authentication)
-   Create a new post
-   Create a comment in a post
-   Follow a user (via WebId)
-   Share photos and videos (React player for videos)
-   Like posts
-   Delete Posts
-   Agregate all Posts from followed users
-   Auto authenticate user on refresh
-   Sign Out

## Future Plans

-   Modify a Post
-   Modify a Comment
-   Modify Profile (Photos, biography)
-   Repost/Reshare a Post
-   Add Notifications
-   Add Circle
-   Download Data as a Dump file (RDF)
-   Query Personal Data and Integrate them with External Knowledge Graph
-   Distributed Reasoning for Recommendation
-   etc.

## Run the Apps

```text
# Clone your work repository, for example:
git clone https://github.com/kabulkurniawan/LinkedPro.git
cd LinkedPro

# Install packages
npm ci

# Run packages
npm start

```
## Credit
Thanks to [Akasi](https://github.com/AKASI1) for providing a nice template and @Rieyota for Testing support



