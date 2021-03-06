const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')


//@des          Get all bootcamps
//@routes       Get /api/vi/bootcamps
//@access       Public
exports.getBootcamps = asyncHandler( async(req,res,next) => {
   
        const bootcamps = await Bootcamp.find()

        res.status(200).json({success:true,count:bootcamps.length, data:bootcamps})
})

//@des          Get single bootcamps
//@routes       Get /api/vi/bootcamps/:id
//@access       Public
exports.getBootcamp = asyncHandler(async(req,res,next) => {
  
        const bootcamps = await Bootcamp.findById(req.params.id)
        if(!bootcamps){
            return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({success:true,data:bootcamps})

});

//@des          Create new bootcamp
//@routes       Post /api/vi/bootcamps
//@access       Private
exports.createBootcamp = asyncHandler(async (req,res,next) => {

  
        const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success:true,
        data:bootcamp
    });
    
})

//@des          Update bootcamp
//@routes       Put /api/vi/bootcamps/:id
//@access       Private
exports.updateBootcamp = asyncHandler( async(req,res,next) => {
   
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        if(!bootcamp){
            return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }

        res.status(200).json({success:true,data:bootcamp})
 
    
})

//@des          detete bootcamp
//@routes       Delete /api/vi//:id
//@access       Private
exports.deleteBootcamp = asyncHandler(async (req,res,next) => {
   
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }

        res.status(200).json({success:true,data:{}})
   

})