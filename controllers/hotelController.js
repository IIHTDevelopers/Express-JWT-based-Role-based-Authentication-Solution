const Hotel = require('../models/hotel');

// Get all hotels (Public route)
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get hotel by ID (Public route)
exports.getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a hotel (Admin-only route)
exports.createHotel = async (req, res) => {
    const { name, location, pricePerNight } = req.body;

    try {
        const hotel = new Hotel({ name, location, pricePerNight });
        await hotel.save();
        res.status(201).json({ message: 'Hotel created successfully', hotel });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a hotel (Admin-only route)
exports.updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, location, pricePerNight } = req.body;

    try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        hotel.name = name || hotel.name;
        hotel.location = location || hotel.location;
        hotel.pricePerNight = pricePerNight || hotel.pricePerNight;
        await hotel.save();

        res.status(200).json({ message: 'Hotel updated successfully', hotel });
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ message: 'Server error' });
    }
};
