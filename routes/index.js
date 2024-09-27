const authRoute=require('./authRoute');
const userRoute=require('./userRoute');
const contentRoute=require('./contentRoute');
const bookmarkroute=require('./bookmarkRoute');
const categoryRoute=require('./categoryRoute');

const mountRoutes=(app)=>{
    app.use('/api/v1/users',userRoute)

    app.use("/api/v1/auth",authRoute);

    app.use("/api/v1/contents",contentRoute);

    app.use("/api/v1/bookmarks",bookmarkroute);

    app.use("/api/v1/categories",categoryRoute);

};

module.exports=mountRoutes;