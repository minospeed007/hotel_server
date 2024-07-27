import Hotel from '../models/Hotels.js'
import Room from '../models/Rooms.js'


export const createHotel= async (req,res,next)=>{
    const newHotel= new Hotel(req.body);
    try{
    const savedHotel= await newHotel.save() 
    res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}
export const updateHotel= async (req,res,next)=>{
    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body},
            {new:true}) 
        res.status(200).json(updatedHotel)
        }catch(err){
            next(err)
        }
}
export const deleteHotel= async (req,res,next)=>{
    try{
        await Hotel.findByIdAndUpdate(req.params.id) 
        res.status(200).json("Hotel has been deleted!")
        }catch(err){
            next(err)
        }
}
export const getHotel= async (req,res,next)=>{
    try{
        const hotel= await Hotel.findById(req.params.id) 
        res.status(200).json(hotel)
        }catch(err){
            res.status(500).json(err)
        }
}
export const countByCity= async (req,res,next)=>{
    const cities=req.query.cities.split(',')
    try{
        const list=await Promise.all(cities.map(city=>{
          return Hotel.countDocuments({city:city})  
        }))
        
        res.status(200).json(list)
        }catch(err){
            next(err)
        }
}
export const getHotels = async (req, res, next) => {
        try {
          const { featured, limit, min, max } = req.query;
      
          const query = {};
      
          if (featured === 'true') {
            query.featured = true;
          }
      
          if (min && max) {
            query.cheapestPrice = { $gt: min, $lt: max };
          }
      
          let hotels;
      
          if (limit) {
            hotels = await Hotel.find(query).limit(parseInt(limit));
          } else {
            hotels = await Hotel.find(query);
          }
      
          res.status(200).json(hotels);
        } catch (err) {
          next(err);
        }
      };
      
    
  
  
export const countByType= async (req,res,next)=>{
    const hotelCount=await  Hotel.countDocuments({type:"hotel"})
    const apartmentCount= await Hotel.countDocuments({type:"apartment"})
    const resortCount= await Hotel.countDocuments({type:"resort"})
    const villaCount= await Hotel.countDocuments({type:"vila"})
    const cabinCount= await Hotel.countDocuments({type:"cabin"})
    console.log('Request URL:', req.url);

    try{
        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount}


        ])
        console.log('Request URL:', req.url);

        }catch(err){
            next(err)
        }
}
export const getHotelRooms = async (req,res,next)=>{
  try{
    const hotel= await Hotel.findById(req.params.id)
    const list=await Promise.all(hotel.rooms.map(room=>{
      return Room.findById(room)
    }))
    res.status(200).json(list);
  }catch(err){
    next(err)
  }
  

}