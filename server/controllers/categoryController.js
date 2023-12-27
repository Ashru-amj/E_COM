

import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: 'Name is Required' });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: 'Category Already exists',
      });
    }

    const category = await new categoryModel({ name, slug: slugify(name) }).save();

    res.status(201).send({
      success: true,
      message: 'New Category Created',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Category',
    });
  }
};

export const updateCategoryController = async(req , res)=>{
try{
    const { name } = req.body;
    const { id } = req.params;
    // Check if the category exists
    const existingCategory = await categoryModel.findById(id);
    if (!existingCategory) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

//updated category
const category = await categoryModel.findByIdAndUpdate(
    id,
    {name, slug : slugify(name)},
    {new:true}
    
);
res.status(200).send({
    success:true,
    message:"Category updated Succesfully",
    category,
})
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error while updating category",
        error
    })
}
}

//get all category
export const categoryController =async(req,res)=>{
   try{
   const category = await categoryModel.find({})
   res.status(200).send({
    success:true,
    message:"All cateories list",
    category,
   })
   }catch(error){
   console.log(error)
   res.status(500).send({
    success:false,
    message:"Error while getting all categories",
    error
   })
   }
}

//single get category

export const singleCategoryController = async(req,res)=>{
    try{
     
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get Single Category Successfully",
            category,
           })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting all categories",
            error
    })
}
}

//deleteCateoryController  
export const deleteCateoryController = async(req , res)=>{
    try{
        const {id} = req.params;
        await categoryModel.findOneAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category deleted Successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting all categories",
            error
    })
}
}