const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

// Express setup
const app = express();
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatpolls', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
const pollSchema = new mongoose.Schema({
  question: String,
  option1: String,
  option2: String,
  option1Votes: { type: Number, default: 0 },
  option2Votes: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  votedBy: [{ type: String }],     // store userId of those who voted
  votedOption: { type: Map, of: String }, // userId -> 'option1' or 'option2'
  likedBy: [{ type: String }] ,     // store userId of those who liked
  id: String,
  title: String,
  description: String,
  image: String,
  options: [String],
  votes: Object,
  comments: [String],
  status: String, 
});

const Poll = mongoose.model('Poll', pollSchema);

// HTTP and Socket.IO server
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' },
});

// ✅ All socket event handlers must be INSIDE this block
io.on('connection', (socket) => {
  console.log('User connected');

  // Send all existing polls
  Poll.find().sort({ _id: -1 }).lean()
      .then(allPolls => {
        socket.emit('initialPolls', allPolls);
      })
      .catch(err => {
        console.error('Error fetching polls:', err);
      });

  // Create poll
  socket.on('createPoll', async (poll) => {
    try {
      const newPoll = new Poll({ ...poll, comments: [] });
      await newPoll.save();
      io.emit('newPoll', newPoll); // broadcast to all clients
    } catch (err) {
      console.error('Error creating poll:', err);
    }
  });

  // Vote
  /*socket.on('vote', async ({ pollId, option }) => {
    try {
      const poll = await Poll.findOne({ id: pollId });
      if (poll && poll.votes?.[option] !== undefined) {
        poll.votes[option] += 1;
        await poll.save();
        io.emit('voteUpdate', { pollId, option });
      }
    } catch (err) {
      console.error('Error voting:', err);
    }
  });*/

  socket.on('vote', async ({ pollId, option, userId }) => {
    try {
      const poll = await Poll.findOne({ id: pollId });
      if (!poll) return;

      if (poll.votedBy.includes(userId)) {
        socket.emit('voteRejected', { message: 'You already voted' });
        return;
      }

      if (poll.votes?.[option] !== undefined) {
        poll.votes[option] += 1;
        poll.votedBy.push(userId); // store voter
        await poll.save();

        io.emit('voteUpdate', { pollId, option });
      }
    } catch (err) {
      console.error('Error voting:', err);
    }
  });

  socket.on('likePoll', async ({ pollId, userId }) => {
    try {
      const poll = await Poll.findOne({ id: pollId });
      if (!poll) return;

      if (poll.likedBy.includes(userId)) {
        socket.emit('likeRejected', { message: 'You already liked this poll' });
        return;
      }

      poll.likedBy.push(userId);
      await poll.save();

      io.emit('pollLiked', { pollId, userId });
    } catch (err) {
      console.error('Error liking poll:', err);
    }
  });


  // Add comment
  socket.on('newComment', async ({ pollId, text }) => {
    try {
      const poll = await Poll.findOne({ id: pollId });
      if (poll) {
        poll.comments.push(text);
        await poll.save();
        io.emit('commentAdded', { pollId, text });
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Server listening
server.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
