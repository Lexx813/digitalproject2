const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  //---->>> POST BLOGS <<<-----

  app.post("/api/blog", (req, res) => {
    var blog = req.body;
    Blog.create(blog, async (err, blogs) => {
      if (err) {
        throw err;
      }
      await res.json(blogs);
    });
  });

  //----->>>> GET BLOG BY ID <<<---------
  app.get("/api/blog/:_id", (req, res) => {
    Blog.findById(req.params._id, (err, foundBlog) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundBlog);
        res.json(foundBlog);
      }
    });
  });
  //----->>>> GET BLOGS <<<---------
  app.get("/api/blog", (req, res) => {
    Blog.find(async (err, blogs) => {
      if (err) {
        throw err;
      }
      await res.json(blogs);
      console.log(blogs);
    });
  });

  //---->>> EDIT BLOGS <<<------
  app.get("/blogs/:_id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blogs) => {
      if (err) {
        res.redirect("/blogs");
      } else {
        res.json(blogs);
      }
    });
  });

  //---->>> UPDATE BLOGS <<<------
  app.put("/api/blog/:_id", function(req, res) {
    var blog = req.body;
    var query = req.params._id;
    // if the field doesn't exist $set will set a new field
    var update = {
      $set: {
        name: blog.name,
        title: blog.title,
        body: blog.body,
        image: blog.image
      }
    };
    // When true returns the updated document
    var options = {
      new: true
    };
    Blog.findOneAndUpdate(query, update, options, function(err, blogs) {
      if (err) {
        console.log("# API DELETE Blogs");
      }
      res.json(blogs);
    });
  });

  // DESTROY blog ROUTE
  app.delete("/api/blog/:_id", function(req, res) {
    Blog.findByIdAndRemove(req.params._id, function(err) {
      if (err) {
        res.send("CANT DELETE");
      } else {
        res.send("DELETED");
      }
    });
  });

};
