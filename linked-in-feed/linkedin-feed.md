# LinkedIn Feed Design

## Objective
In this document I am going to try designing the LinkedIn Feed page. LinkedIn Feed of a owner contains curated set of posts shared by other users that the owner follows.  

## Functional Requirements
The following is the high level overview of the actions that users can perform in the system:
+ Users can create posts
+ Users can view a collection of posts created by people followed by them in their feed
+ Users can like and comment on the posts

Meta data information of a single post:
```
profile_photo
name
message
created_at
likes
comments
```

## Non Functional Requirements
+ A single user is assumed to create one post per day
+ A single user is assumed to follow approximately 500 people
+ A single user is assumed to make 20 likes and 5 comments per day
+ Number of active users per day assumed to be approximately 500K
+ The system is assumed to support approximately 1M users in 5 years
+ The system is assumed to support approximately 2B posts in 5 years
```
1 post per day by a single user * 5 years = ~2000 posts
1M users with 2000 posts per user for 5 years = 1M * 2000 = ~2B posts
```
+ The system is expected to support approximately 1M posts creation per day
+ Total storage requirements for posts in 5 years - 1TB
```
2B posts * 500 Bytes per post = 1TB
```
+ Total storage requirements for posts in 1 day - 500MB
```
1M posts * 500 Bytes per post = 500MB
```
+ Total likes made by all users per day is approximately 10M
```
500K users per day * 20 likes per user oer day = 10M
```
+ Total comments made by all users per day is approximately 2.5M
```
500K users per day * 5 comments per user per day = 2.5M
```
+ The system should be highly available with close to zero downtime
+ The system is assumed to be globally distributed

Total posts 

## API Contracts
1. Create Post API
```
POST /post
{
    name: string,
    message: string,
    created_at: datetime,
    profile_photo: url
}
```

2. Like Post API
```
POST /post/{postId}/like
```

3. Comment on Post API
```
POST /post/{postId}/comment
{
    comment: string
}
```

4. User Feed API
```
GET /user/{userId}/feed
```

## High Level Design

### Components

+ Posts
    + To accept huge amount of writes, posts db could be sharded using consistent hashing by post id
    + Every shard can have replication factor of 3 with automatic failover to support high availability
    + Write & read quorum can be 2 so that we don't get stale reads
    + Geographic replication can happen asynchronously so the posts will be eventually consistent. There would as well be minimal conflicts during async replication because no 2 users can create the same post

+ User Comments
    + To accept huge amount of writes, user comments db could be sharded using hash-based sharding technique by user id
    + Every shard can have 2 slaves with automatic failover to support high availability
    + Geographically replication can happen asynchronously so the comments for posts will be eventually consistent.

## FAQs


Comments: 
+ Post deletions? 