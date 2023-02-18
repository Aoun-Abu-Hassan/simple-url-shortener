# URL Shortener
This is a Node.js application that provides an API to shorten URLs. It uses Express.js as the web framework and MongoDB as the database.


------------



### Installation
1. Clone the repository: git clone https://github.com/Aoun-Abu-Hassan/simple-url-shortener
2. Install dependencies: npm install
3. Start the server: npm start


------------



### API Endpoints
##### POST /api/shorten-url
This endpoint is used to shorten a URL.

**Request body**

```
{
    "originalUrl": "https://example.com"
}
```
The originalUrl field should contain the URL that needs to be shortened.

**Response**

```
{
    "message": "Url shortened successfully",
    "data": {
        "originalUrl": "https://example.com",
        "shortUrl": "http://localhost:3000/api/urls/abc123",
        "uniqueID": "abc123"
    }
}
```
The shortUrl field contains the shortened URL, while the uniqueID field contains the unique identifier for the shortened URL.


##### GET /api/urls/:id
This endpoint is used to redirect the user to the original URL corresponding to a given unique identifier.

------------

### Docker
You can also use Docker Compose to build and run this project. Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to define the services that make up your app in a `docker-compose.yaml` file and run them all with a single command.

**docker-compose.yaml file :**
```
version: '3.8'

services:
  mongodb:
    image: mongo
    volumes:
      - data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root
    ports: # for development purposes
      - 30000:27017
  server:
    build: ./
    volumes: # for development purposes
      - ./:/app
      - /app/node_modules
    ports:
      - 3000:3000
volumes:
  data:
```

**Run the following command to run the server :**
```
docker-compose up -d
```

### Error handling
**The API returns errors in JSON format.**

**Example:**

`
{
  "message": "message",
  "data": [
    {
      "param": "param",
      "msg": "msg"
    }
  ]
}
`


------------



### Support
For support and questions, contact me : info@aounah.com or saltshani1#1111

### Contributing
If you have any suggestions or improvements, feel free to create a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.