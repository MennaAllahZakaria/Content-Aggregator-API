const authRoute=require('./authRoute');
const userRoute=require('./userRoute');
const contentRoute=require('./contentRoute');

const mountRoutes=(app)=>{
    app.use('/api/v1/users',userRoute)

    app.use("/api/v1/auth",authRoute);

    app.use("/api/v1/contents",contentRoute);
    };

module.exports=mountRoutes;