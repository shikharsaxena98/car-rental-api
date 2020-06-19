const carModel = require('./../models/car');

class CarController {
    async addNewCar(req,res,next) {
        const request = req.body;
        const carDocument = new carModel({
            model : request.model,
            vehicle_number:request.vehicle_number,
            seating_capacity:request.seating_capacity,
            rent_price_per_day: request.rent_price_per_day
        });
        if(!this.validateCarModel(carDocument)) {
            res.status(400).json({success:false, message:"Invalid Entry."});
            return;
        }
        try {
            const afterSave = await carDocument.save();
            console.log(afterSave);
            res.status(200).send({success:true,message:"Successfully saved to DB"});
            return;
        } catch(err) {
            console.log(err);
            res.status(400).json({success:false,message:err});
            return;
        }
    }

    validateCarModel(carDocument) {
        console.log(carDocument);
        if(!carDocument) return false;
        if(carDocument.model.length<=0) return false;
        if(!carDocument.vehicle_number) return false;
        if(!carDocument.seating_capacity||!parseInt(carDocument.seating_capacity)) return false;
        if(!parseInt(carDocument.rent_price_per_day || carDocument.rent_price_per_day<0)) return false;

        return true;
    }
    
    deleteCar(req,res,next) {
        const body = req.body;
        let id = body.car_id;

    }

    getAvailableCars(req,res,next) {
        const keys = ["model","vehicle_number","seating_capacity","rent_price_per_day"];
        const body  = req.body;
        for(let key in body) {
            console.log(key );
            if(!keys.includes(key) || body[key]==undefined ||  body[key].length<=0) {
                res.status(400).json({Success:false,"message":"Bad Input"});
                return ;
            }
            
        }
        const filters = this.getFilters(body);
        console.log(filters);
        // filters.rent_price_per_day = parseInt(filters.rent_price_per_day);
        carModel.find(filters)
        .then((cars) => {
            if(cars.length==0) {
                res.status(200).json({success:true,message:"No Records found"});
                return ;
            }
            const carMap = {};
            cars.forEach(car => {
                carMap[car._id] = car;
            });
            res.status(200).json({success:true,message:carMap});
            return ;
        })
        .catch(err=> {
            console.log(err);
            // res.send(400).json({success:false,message:err});
            return ;
        })
        return ;
    }

    getFilters(body) {
        const filts = {};
        if(Object.keys(body).length==0) return filts;
        
        if(body.model && body.model.length > 0) filts.model =body.model;
        console.log(body.vehicle_number!=undefined);
        if(body.vehicle_number!=undefined) filts.vehicle_number = body.vehicle_number;
        if(body.seating_capacity) filts.seating_capacity = {$gte:body.seating_capacity};
        if(body.rent_price_per_day) filts.rent_price_per_day = {$lte: (body.rent_price_per_day)};
        return filts;
    }

    async deleteCar(req,res,next) {
        const body = req.body;
        if(!Object.keys(body).includes("_id")) {
            res.status(400).json({success:false,"message":"Please Provide the Car ID"});
        }
        let resp;
        try {
            resp = await carModel.deleteOne({_id:body._id});
        } catch(err) {
            res.status(400).json({success:false,message:"No Record found."});
            return ;
        }
        res.status(200).json({success:true,message:"Deletion Successful"});
    }

    async updateCar(req,res,next) {
        const body = req.body;
        if(!Object.keys(body).includes("_id")) {
            res.status(400).json({success:false,message:"Please Provide the Car ID"});
        }
        const updates = body;
        delete updates._id;
        if(Object.keys(updates).length<=0){
            res.status(400).json({success:false,message:"No update parameters found"});
            return ;
        }
        let updatedCar;
        try {
            updatedCar = await carModel.findOneAndUpdate({id:body._id},updates);
        }
        catch(err) {
            console.log(err);
            res.status(400).json({"success":false,message:"Could not update entry"});
            return ;
        }
        res.status(200).json({success:true,message:updatedCar});
        return ;
    }


}

module.exports = new CarController();