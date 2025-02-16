import express from "express"
import jwt from "jsonwebtoken"
import { contentModel, LinkModel, userModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req,res) =>{  // Zod validation and hashed password 
    const username = req.body.username;
    const password = req.body.password;

    try {
        await userModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "Signed up successful"
        })
    } catch(e) {
        res.status(411).json({
            message: "Username already exists"
        })
    }
});

app.post("/api/v1/signin", async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await userModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id  
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

app.post("/api/v1/content", userMiddleware, async (req,res) =>{
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;

    await contentModel.create({
        link, 
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added "
    })
});

app.get("/api/v1/content", userMiddleware, async(req,res) =>{
    //@ts-ignore 
    const userId = req.userId;
    const content = await contentModel.find({        // converted findOne to find to get all the contents available
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
});

app.delete("/api/v1/content", userMiddleware, async(req,res) =>{
    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => { // When you put json data like "share": true put it as a boolean not as a string
    const share = req.body.share;
    
    if(share){
            const existingLink = await LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });

            if(existingLink){
                res.json({
                    hash: existingLink.hash
                })
                return;
            }

            const hash = random(10)
            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            })
            res.json({
                message: hash           // "/share/" + hash
            })
    } else {
            await LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId,
            })
            res.json({
                message: "Removed Link"
            })
       } 
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return 
    } 
        const content = await contentModel.find({
            userId: link.userId
        })

        const user = await userModel.findOne({
            _id: link.userId
        })

        if(!user){
            res.status(411).json({
                message: "user not found, error should ideally not happend"
            })
            return;
        }

        res.json({
            username: user.username,
            content: content
        })
})

if (app.listen(3000)){
    console.log("Listining on port 3000")
} else {
    console.log("Failed to listen")
}

