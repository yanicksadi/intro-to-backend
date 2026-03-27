import express from 'express'

const app = express();
const PORT = 3000;

app.use(express.json())

let posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is my first blog post"
  },
  {
    id: 2,
    title:"Second Post",
    content: "Learning Node is Fun!"
  }
];

app.get("/", (req, res)=>{
  res.send({message:"Welcome to Blog Api"})
})

// here we can get all posts through the posts api

app.get("/api/posts", (req, res)=> {
  res.json(posts);
})

//here we can get one post by their ID

app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if(!post){
    return res.status(404).send("Post not found");
  }

  res.json(post);

})

// To ADD A NEW POST ON OUR BLOG  
app.post('/api/posts', (req, res) => {


if(!req.body.title || !req.body.content){
  return res.status(400).json({
    message: "Title and content are required"
  })
}

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  
  posts.push(newPost);

  res.status(201).json(newPost);
});


//  for EDITING OR UPDATING  A POST

app.put('/api/posts/:id', (req, res) => {
 const id = parseInt(req.params.id);

 const post = posts.find(p => p.id === id);

 if(!post){
  return res.status(404).json({ message: "post not found" });
 }

 if (!req.body.title || !req.body.content){
  return res.status(400).json({
    message: "Title and content are required"
  });
 }
 if(req.body.title){
  post.title = req.body.title
 }
 if(req.body.content){
  post.content = req.body.content
 }

post.title = req.body.title;
post.content = req.body.content;

res.json(post)
});


app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`)
})