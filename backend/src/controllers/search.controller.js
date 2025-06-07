import Search from "../models/search.model.js";

const searched = async (req,res) =>{
    const {start , end , vehicle ,  routePref ,user } = req.body;

    // Validate input
    if (!(start || end|| vehicle || routePref)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Create new search history
    const newSearch = await Search.create({
        start,
        end,
        vehicle,
        routePref,
        user
    });

    if (!newSearch) {
        return res.status(500).json({ message: "Failed to create search history" });
    }

    res.status(201).json({ newSearch, message: "Search history created successfully" });
    console.log("Search history created successfully:", newSearch);
}

export { searched };