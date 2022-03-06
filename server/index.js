import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRoutes from './routes/stories.js';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';
import storyText from './models/storyMessage.js';
import userRoutes from './routes/users.js';
import moderatorRoutes from './routes/moderator.js';

const app = express();
const server = createServer(app); 
const io = new Server(server
    , {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
}
);

const defaultValue = "";
const authorList = [];

io.on('connection', socket => {
    


    socket.on('get-document', async docID => {
        const storyy = await findOrCreateStory(docID);
        socket.join(docID);
        socket.emit('load-document', storyy);
        socket.on('send-changes', delta => {
        socket.broadcast.to(docID).emit('receive-changes', delta);
        });
        socket.on('send-title', titles => {
            socket.broadcast.to(docID).emit('receive-title', titles);
        })
        socket.on('send-author', author => {
            console.log('backend: ', author)
            if(!authorList.find((author1) => author1 === author))
                authorList.push(author);
            console.log('backend list: ', authorList)
            io.to(docID).emit('receive-author', authorList);
        })
        socket.on('leave-room', author => {
            console.log('backend-leave: ', author)
            if(authorList.find((author1) => author1 === author)) {
                authorList.splice(authorList.indexOf(author), 1);
            }
            console.log('backend list-leave: ', authorList)
            socket.broadcast.to(docID).emit('receive-author', authorList);
        })
        socket.on('send-category', categories => {
            socket.broadcast.to(docID).emit('receive-category', categories);
        })
        socket.on('send-image', img => {
            socket.broadcast.to(docID).emit('receive-image', img);
        })
        socket.on('form-submit', storyData => {
            authorList.length = 0;
            socket.broadcast.to(docID).emit('receive-form', storyData);
        })

        socket.on('save-document', async data => {
            await storyText.findOneAndUpdate({storyID: docID}, {story: data}, {new: true})
            // const s = await storyText.findOne({storyID: docID});
            // console.log(s);
        })
        socket.on('save', async data => {
            await storyText.findOneAndUpdate({storyID: docID}, {author: data.author, image: data.image, title: data.title, category: data.category}, {new: true})
            // const s = await storyText.findOne({storyID: docID});
            // console.log(s);
        })

    });

    console.log('connected');
});
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/stories', storyRoutes);
app.use('/users', userRoutes);
app.use('/moderator', moderatorRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`))) // if successful connection
    .catch((err) => console.log(err.message)); // if failure

async function findOrCreateStory(mid){
    if(mid == null) return;

    const hmm = await storyText.findOne({storyID: mid});
    if(hmm) 
        return hmm;
    return await storyText.create({storyID: mid, image: '', author: '', title: '', category: '', story: defaultValue});
}