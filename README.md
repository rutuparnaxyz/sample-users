# How to start.
`node app.js`

# Test in postman
POST http://localhost:3000/users // Use this url to post users. Raw JSON given in postman.json
GET  http://localhost:3000/users

# Flow of the application

Entry Point app.js --> router.js --> controller.user-controller.js --> 
            service.user-service.js --> models.user-model.js

# You can find failed and sucess files under dump folder.