# A GraphQL project about malware. :computer:
This is a basic graphql project to connect to a Mongo database about malware.

In this project uses certain characteristic of GraphQL languages:

- Queries
- Resolvers
- Custom types
- Args
- Mutations
- Nested types
- Error handler
- Enums
- Interfaces
- Schema directives
- Unions

## **|** Connect to the database.

I connect this app whit a local installation of MongoDb.

To install MongoDB in your system you can follow this tutorial → [link](https://docs.mongodb.com/manual/installation/) 

I configure a .env file to the project with the credentials to stablish the connection with mongo. You have to create one in your local environment to connect to the db.

Here's an example

```
DB_HOST=
DB_PORT= 
DB_NAME=
```

DB_HOST sets the name of the host, if host runs in your machine, you can put *localhost* 

DB_PORT sets the port number that mongo use, default us *27017*.

DB_NAME sets the db name, in this exercise I use *Malwares*

**IMPORTANT** this was a project for educational purposes, so I didn't set user and pass for the connections but if you want to create a project for professional use is mandatory the use of these credentials to secure the access to the data.

I upload a .zip file called 'Malwares' with a copy of the database used fot this project.

You can unzipped and restore it to your local mongo database with the mongorestore command, just change to the folder where you unzipped and run the command
`mongorestore -d Malware`

You can check the existence of the db restored switching to the database created. Here's an example using mongo commands in bash.

```bash
$ use Malwares
switched to db Malwares
$ show collections
Companies
Malwares
$
```

## **|** How to deploy it?

1. Use  `git clone`. to have a copy of the repository on your machine.
   
2. Go to the folder of the project and install with `npm install`.
   
3. Run the project with `npm run`

GraphiQL the graphical interface for GraphQL queries is active. If you want to turn it off change value of `graphiql: true` param to `graphiql: isDev`

Here's a screenshot of the API running:

![alt text][api]


## **|** Use.

### Queries example:

- Get a list of Malwares stored:

```graphql
{
  getMalwares {
    _id
    media
    title
    severity
    description
    info_provider{
      title
      country
    }
  }
}
```
Output example:

```graphql
{
  "data": {
       "getMalwares": [
            {
                "_id": "5e8c0b8da1328a4b507cd23e",
                "media": "Usb",
                "title": "Stuxnet",
                "severity": "medium",
                "description": "This super-sophisticated worm has the ability to infect devices via USB drives, so there is no need for an internet connection.",
                "info_provider": [
                {
                    "title": "Trendmicro",
                    "country": "Japan"
                }
                ]
            }
        ]
    }
}
```

Query using fragments to set the fields that I wan to show.

```graphql
{
  
  firstMalware: getMalware(id:"5e8d838b26b06301359765f1") {
	...MalwareFields
  }
}

fragment MalwareFields on Malware{
  _id
  title
  description
  info_provider{
    title
  }
}
```

Output example:
```graphql
{
  "data": {
    "firstMalware": {
      "_id": "5e8d838b26b06301359765f1",
      "title": "Gh0st",
      "description": "used to control infected endpoints. Gh0st is dropped by other malware to create a backdoor into a device that allows an attacker to fully control the infected device.",
      "info_provider": [
        {
          "title": "Avast"
        },
        {
          "title": "Karspesky"
        }
      ]
    }
  }
}
```
Query using unions to bring results of related with term RAT.

```graphql
{
  searchItems(keyword: "RAT"){
    __typename
    ...on Malware {
      title
      description
    }
    ...on Company{
      title
      country
    }
    ...on Organization{
      title
      webpage
    }
  }
}
```

output example:
```graphql
{
  "data": {
    "searchItems": [
      {
        "__typename": "Malware",
        "title": "HiddenWasp",
        "description": "HiddenWasp malware could run commands on the terminal, execute files, download more scripts, etc. on the affected Linux computer remotely.",
        "family": "RAT"
      },
      {
        "__typename": "Malware",
        "title": "Gh0st",
        "description": "used to control infected endpoints. Gh0st is dropped by other malware to create a backdoor into a device that allows an attacker to fully control the infected device.",
        "family": "RAT"
      }
    ]
  }
}
```

### Mutation example:

The following command creates a provider of information in the database.

```graphql
mutation {createProvider(input:{
    title: "Bitdefender"
    country: "Romania"
    logo: "https://http2.mlstatic.com/antivirus-bitdefender-total-security-3-pc-1-ano-en-caja-D_NQ_NP_916303-MCO31567788529_072019-F.jpg"
  }){
    title
    country
  }
}
```
Output example:
```graphql
{
  "data": {
    "createProvider": {
      "title": "Bitdefender",
      "country": "Romania"
    }
  }
}
```

Create a malware using enum "severity" and using params in the command.

```graphql
mutation createNewMalware($createInput: MalwareInput!){
  createMalware(input: $createInput){
    _id
    title
    severity
  }
}
```
The query (that are inserted in the query variables window section pf graphiql) will be:
```graphql
{
	"createInput": {
    "title": "SQL Slammer",
    "family": "Worm",
    "year": 2006,
    "description": "Targeted and took advantage of a bug in the code of Microsoft’s SQL servers. It was devastating and spread rapidly",
    "media": "Email",
    "severity": "critical"
  }
}
```

output:
```graphql
{
  "data": {
    "createMalware": {
      "_id": "5ea50f749aa7b9023df66b51",
      "title": "SQL Slammer",
      "severity": "critical"
    }
  }
}
```


[api]: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/72824d75-05f5-48c7-8117-b562501c7e1d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200426T033907Z&X-Amz-Expires=86400&X-Amz-Signature=359f629f50dc13e50f837b5f21c4ea6cbc88df8ef1257f74d075939401d75974&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22 "api Title Text 2"

