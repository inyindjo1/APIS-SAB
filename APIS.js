const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2 running');
  next();
});

let users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 }
];

let posts = [
  { id: 1, userId: 1, title: 'Hello World' },
  { id: 2, userId: 2, title: 'Second Post' }
];

let comments = [
  { id: 1, postId: 1, content: 'Nice post!' },
  { id: 2, postId: 2, content: 'Thanks for sharing.' }
];


app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  user.age = req.body.age;
  res.json(user);
});

// app.delete('/api/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex(u => u.id === id);
//   if (index === -1) return res.status(404).send('User not found');
//   const deleted = users.splice(index, 1);
//   res.json(deleted[0]);
// });


// app.get('/api/posts', (req, res) => {
//   const userId = req.query.userId;
//   if (userId) {
//     const filtered = posts.filter(p => p.userId == userId);
//     return res.json(filtered);
//   }
//   res.json(posts);
// });

// app.post('/api/posts', (req, res) => {
//   const newPost = {
//     id: posts.length + 1,
//     userId: req.body.userId,
//     title: req.body.title
//   };
//   posts.push(newPost);
//   res.status(201).json(newPost);
// });

// app.put('/api/posts/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const post = posts.find(p => p.id === id);
//   if (!post) return res.status(404).send('Post not found');
//   post.title = req.body.title;
//   res.json(post);
// });

// app.delete('/api/posts/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = posts.findIndex(p => p.id === id);
//   if (index === -1) return res.status(404).send('Post not found');
//   const deleted = posts.splice(index, 1);
//   res.json(deleted[0]);
// });

// app.get('/api/comments', (req, res) => {
//   res.json(comments);
// });

// app.post('/api/comments', (req, res) => {
//   const newComment = {
//     id: comments.length + 1,
//     postId: req.body.postId,
//     content: req.body.content
//   };
//   comments.push(newComment);
//   res.status(201).json(newComment);
// });

// app.put('/api/comments/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const comment = comments.find(c => c.id === id);
//   if (!comment) return res.status(404).send('Comment not found');
//   comment.content = req.body.content;
//   res.json(comment);
// });

// app.delete('/api/comments/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = comments.findIndex(c => c.id === id);
//   if (index === -1) return res.status(404).send('Comment not found');
//   const deleted = comments.splice(index, 1);
//   res.json(deleted[0]);
// });


// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(500).send('Something went wrong.');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
