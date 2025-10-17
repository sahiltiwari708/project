import {Blog} from "../models/blog.model.js";
import {v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";


export const createBlog=async(req,res)=>{
  try {
      if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({message:"  Blog image is required"});
    }
    const {blogImage}=req.files;
    const allowedFormats=["image/jpeg" , "image/png","image/webp"];
    if(!allowedFormats.includes(blogImage.mimetype)){
        return res.status(400).json({message:"Only jpg and png are allowed"});


    }
    const {title,category,about}=req.body;
    if(!title || !category || !about ){
        return res.status(400).json({message:"Title category and about are required feilds"});
    }
    const adminName=req?.user?.name;
    const adminPhoto=req?.user?.photo;
    const createdBy=req?.user?._id;

    
    const cloudinaryResponse=await cloudinary.uploader.upload(
        blogImage.tempFilePath
    ) 
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(cloudinaryResponse.error)
    }
    const blogData={title,about,category,adminName,adminPhoto,createdBy,blogImage:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
    }};
    const blog=await Blog.create(blogData);




    
        res.status(201).json({message:"Blog  created succesfully",blog});

        
    

  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal Server error" });

    
  }



};
export const deleteBlog=async (req,res)=>{
    const{id}=req.params;
    const blog=await Blog.findById(id);
    if(!blog){
        res.status(404).json({message:"Blog not found" });

    }
    await blog.deleteOne();
    res.status(200).json({message:"Blog Deleted Successfully" });

}
export const getAllBlog=async (req,res)=>{
    const allBlogs=await Blog.find();
    res.status(200).json({allBlogs });


}

export const getSingleBlogs=async (req,res)=>{
    const{ id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message:"Invalid Blog Id" });

    }
    const blog=await Blog.findById(id);
    
    if(!blog){
        res.status(404).json({message:"Blog not found" });

    }
    res.status(200).json({blog });

}
export const getMyBlogs=async (req,res)=>{
    const createdBy=req.user._id;
    const myBlogs=await Blog.find({createdBy});
    res.status(200).json({myBlogs });

};
export const updateBlog=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message:"Invalid Blog Id" });

    }
    const updatedBlog=await Blog.findByIdAndUpdate(id,req.body,{new:true});
    if(!updatedBlog){
        res.status(404).json({message:"Blog not found" });

    }
    res.status(200).json({updatedBlog });

};