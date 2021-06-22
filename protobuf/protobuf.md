# Protobuf

Protobuf is a binary message format crafted by Google and is efficient compared to other message formats like JSON & XML.

But why is Protobuf efficient? Is it a better option to move to Protobuf from JSON/XML messaging formats? To answer these questions lets dive deep into Protobuf and understand its working principle.   

We all know about JSON, the most popular messaging format for transferring messages in web applications. JSON is human readable, efficient compared to XML and easy to work with. JSON is also supported natively on backend frameworks like NodeJS and client applications like Chrome. This makes JSON serialization and de-serialization quick and fast in Javascript environments. 

So why should we learn a new messaging format when JSON already does the job well? See if the following points convince you. 

1. Protobuf because its already in binary, serialization and de-serialization is very fast and also the size of the message is less compared to JSON & XML. Also with server compression turned on Protobuf payload size becomes even smaller. So with Protobuf our web applications can request and respond much faster! 

2. JSON doesn't allow strict schema definition for messages. This may not be a big problem because the message validation can happen in the clients or servers. But lets say, for eg multiple microservices are interacting with each other through a message broker like Kafka, using JSON messages. What happens when producers want to update a specific JSON attribute? This could force us to change the validation logic across thousands of consumers in a big application. This problem can be solved using Protobuf along with a Schema Registry in Kafka. 

3. With Protobuf, development effort is much lesser because the protocol buffer compiler automatically generates code for serialization and de-serialization messages for many popular languages. 

Incase the above points are not convincing to you then maybe you can consider learning Protobuf as an extra tool. I have read somewhere that learning new things can keep your brain muscles active! :)

## Protobuf Internals
