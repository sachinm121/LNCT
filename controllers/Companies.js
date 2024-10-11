const Companies = require("../models/Companies");

exports.createCompany = async(req, res) => {
    try {
        const {name, email, location, about, website, linkedIn} = req.body;

        if(!name || !email){
            return res.status(403).json({
                success: false,
                message: "All fields are mandetory"
            })
        }

        const companyDetails = await Companies.create({
            name : name,
            email : email,
            location : location,
            about: about,
            website : website,
            linkedId : linkedIn,
            logo : `http://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            PlacedStudents : []
        })

        return res.status(200).json({
            success : true,
            message : "Comapny Created Successfully"
        })

    } catch (error) {
        console.log("Error occured while creating comapny")
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}