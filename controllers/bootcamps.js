const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')


//@des          Get all bootcamps
//@routes       Get /api/vi/bootcamps
//@access       Public
exports.getBootcamps = async (req,res,next) => {
    try {
        const bootcamps = await Bootcamp.find()

        res.status(200).json({success:true,data:bootcamps})
    } catch (error) {
        res.status(400).json({success:false})
    }
    
}

//@des          Get single bootcamps
//@routes       Get /api/vi/bootcamps/:id
//@access       Public
exports.getBootcamp = async (req,res,next) => {
    try {
        const bootcamps = await Bootcamp.findById(req.params.id)
        if(!bootcamps){
            return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({success:true,data:bootcamps})
    } catch (err) {
        // res.status(400).json({success:false})
        next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
    }

};

//@des          Create new bootcamp
//@routes       Post /api/vi/bootcamps
//@access       Private
exports.createBootcamp = async (req,res,next) => {

    try {
        const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success:true,
        data:bootcamp
    });
    } catch (error) {
        res.status(400).json({
            success:false
        })
    }
    
}

//@des          Update bootcamp
//@routes       Put /api/vi/bootcamps/:id
//@access       Private
exports.updateBootcamp = async (req,res,next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        if(!bootcamp){
            return res.status(400).json({success:false})
        }

        res.status(200).json({success:true,data:bootcamp})
    } catch (error) {
        res.status(400).json({success:false})
    }    
    
}

//@des          detete bootcamp
//@routes       Delete /api/vi//:id
//@access       Private
exports.deleteBootcamp = async (req,res,next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return res.status(400).json({success:false})
        }

        res.status(200).json({success:true,data:{}})
    } catch (error) {
        res.status(400).json({success:false})
    }    

}