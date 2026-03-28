import posts from "../data/posts.js";

// GET ALL POSTS
// const postsController = express.postsController;

export const getAllPosts = (req, res) => {
  res.json(posts);
}

// GET BY ID

export const getById = (req, res) => {
  const id = parseInt(req.params.id); 
  
  const post = posts.find(p => p.id === id);

  if(!post) {
    return res.status(404).json({message: "post not found"});
  }

  res.json(post);
};

// CREATE A POST

export const createPost = (req, res) => {
  if(!req.body.title.trim() || !req.body.content.trim()){
    return res.status(400).json({message: "Title and content are required"});
  }

 const newPost = {
  id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
  title: req.body.title,
  content: req.body.content
 };

 posts.push(newPost);

 res.status(201).json(newPost);
};

// UPDATING POSTS

export const updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  
  const post = posts.find(p => p.id === id);

  if(!post){
    return res.status(404).json({
      message: "post not found"
    });
  }

  if (req.body.title){
    post.title = req.body.title;
  }

  if(req.body.content){
    post.content = req.body.content;
  }

  res.json(post);
};

// DELETING POSTS

export const deletePost =  (req, res) => {
  const id = parseInt(req.params.id);

  const index = posts.findIndex(p => p.id === id);
  if (index !== -1){
    posts.splice(index, 1);
    res.json({message: "post Deleted"});
  } else {
    res.status(404).json({message: "Post not found"});
  }
};
