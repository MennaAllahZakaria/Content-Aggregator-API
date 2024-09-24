const authRoute=require('./authRoute');
const userRoute=require('./userRoute');


const mountRoutes=(app)=>{
    app.use('/api/v1/users',userRoute)

    app.use("/api/v1/auth",authRoute);

    };

module.exports=mountRoutes;