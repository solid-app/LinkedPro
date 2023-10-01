# LinkedPro

Social Network Platform based On Solid specification

**_Built using React JS and Solid Client Library_**

## Specifications

* [WebID](https://www.w3.org/2005/Incubator/webid/spec/identity/) for personal/agent identities.
* [Web Access Control](https://solidproject.org/TR/wac)/ACL to set permissions on Web resources.
* W3C [Linked Data Platform](http://www.w3.org/TR/ldp/) and [Solid Protocol](https://solidproject.org/TR/protocol) servers to read and write Web resources.
* W3C [ActivityPub](https://www.w3.org/TR/activitypub/) client to read/write from/to profile's outbox.
* W3C [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary) for social activities.
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


```text
# Clone your work repository, for example:
git clone https://github.com/kabulkurniawan/LinkedPro.git
cd LinkedPro

# Install packages
npm ci

# Run packages
npm start

```

