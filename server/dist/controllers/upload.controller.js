export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        // Generate the URL based on the server host and file path
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: {
                url: fileUrl,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
