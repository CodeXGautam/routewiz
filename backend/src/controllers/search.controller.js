import Search from "../models/search.model.js";

const searched = async (req,res) =>{
    const {start , end , vehicle ,  routePref } = req.body;
	const user  = req.user._id;
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


const clearSearchHistory = async (req, res) => {
	try {
		const user = req.user;

		if (!user) {
			return res.status(401).json({ message: "Unauthorized user" });
		}

		const deletedHistory = await Search.deleteMany({ user: user._id });

		if (deletedHistory.deletedCount === 0) {
			return res.status(404).json({ message: "No history found to delete" });
		}

		res.status(200).json({ message: "History deleted successfully" });
	} catch (error) {
		console.error("Error deleting search history:", error);
		res.status(500).json({ message: "Failed to delete history" });
	}
};



export { searched, clearSearchHistory };
