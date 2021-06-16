# CAP Theorem

As Wikipedia says, 

CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:
+ Consistency (C)
+ Availability (A)
+ Partition tolerance (P)

But what is Consistency, Availability Partition tolerance? How does it help to architect better systems? Let's dig deep into the CAP theorem and find out the answers for these questions. 

## Consistency
A system is consistent when it is able to return the latest data immediately after creation/modification. 

![Fig 4](fig4.png)

In the architecture below, we have 3 databases - one primary and 2 replicas. All writes go to the primary database and **synchronously** replicated to all replicas. Replicas are able to serve only read requests while the primary is able to take in writes. When a client writes some data to the primary, it synchronously replicates that data to all replicas and returns a success response to the client. This type of system is called as strongly consistent or linearizable.

![Fig 5](fig5.png)

The strong consistency nature of this system comes from the fact that data is always up-to-date in all replicas and clients can read from any database (replicas or primary) to get the latest data. In the figure below, client 1 writes data for id = 1 to the primary database. The primary replicates that data to all replicas and sends ok to the client once replication is successfully completed. When client 2 tries to read user with id = 1 either from replica 1 or replica 2, it is able to receive the correct data because the replication happens synchronously in an all or nothing fashion.  

![Fig 6](fig6.png)

If the primary is not able to replicate the data to any of the replicas then data is not stored in any of the databases and error response is send back to the user. As you are able to see both the clients get nil from the replicas when they try to read user with id = 1. 

![Fig 7](fig7.png)

Our system is possibly consistent, either data is present in all the databases or none. But what could be the problem with this architecture? Think about it and let's discuss this at the end of the article. 

## Availability 
When a system is stated as available, it's mostly able to serve requests all the time. 

![Fig 3](fig3.png)

Let's understand with an example. Take the following architecture (see below), in this we have a database called as primary and 2 databases called as replica respectively. All writes go to the primary database and **asynchronously** replicated to all the replicas. Replicas are able to serve only read requests while the primary is able to serve read and write requests. When a client writes some data to the primary, it may not be immediately available in the replicas for reading because of the asynchronous nature of the replication process, but the data may be eventually available. This type of system is called as eventually consistent.

![Fig 1](fig1.png)

Since we have 3 databases to serve read requests, we may avoid single point of failures for reads i.e if a database is down for some reason, another database can keep responding to read queries. Such system can be highly available for reads. But this comes with a tradeoff, data that is read may not be consistent across all the clients. 

In the diagram below, client 1 writes Alice to the primary database and gets back a success response once data is written. Primary then asynchronously replicates the data to the replicas. When client 2 tries to read that data from replica 1, it returns the user because the primary database, at this time, has copied the data to replica 1. But when client 2 after sometime connects to replica 2 to read the data we get nil because the primary has not copied its data to replica 2 yet. 

![Fig 2](fig2.png)

In real world we may have situations where some databases face arbitrary outages, in such cases our system will keep responding the old data i.e nil in this case for id = 1, to all the clients reading from replica 2. This discrepancy of reads will be eventually solved once the primary is able to successfully copy it's data to replica 2. 

![Fig 8](fig8.png)

Our system is available on reads as it's able to serve requests from multiple databases - no single point of failure. But the system is not consistent. 

You may have the following question, why can't we make this system synchronously replicate it's write and solve the inconsistent reads problem? 

Good question. Yes, you are correct, we can potentially solve the inconsistent reads problem with synchronous replication, but there is a caveat. If your primary database always waits until the data is replicated to all its replicas, how would the system scale for high throughput and frequent writes? Think about it and let's revisit this topic again towards the end of the article. 

## Partition Tolerance

## System Design and CAP