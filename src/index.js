const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const db= require('./models/index')
const {User, Role} = require('./models/index');

const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');
const { RelationshipType } = require('sequelize/lib/errors/database/foreign-key-constraint-error');

const app = express();

const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
        console.log(` Server Started at PORT ${PORT} .`);
        
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }

        // const u1=await User.findByPk(1);
        // const r1= await Role.findByPk(2);
        // //u1.addRole(r1);
        // const respone = await u1.hasRoles(r1);
        // console.log(respone);

        // const service = new UserService();
        // // const newToken = service.createToken({email:'sonali@gmail.com',id:1});
        // // console.log("new token is : ",newToken);
        // const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbmFsaUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzgyODAyNDYwLCJleHAiOjE3ODI4MDI0OTB9.HJ5-EaL0e6f_Yiy-wmklSzjbfu3rbja0Xr6vDRdF4jo';

        // const response = service.verifyToken(token);
        // console.log(response);
    });
}

prepareAndStartServer();