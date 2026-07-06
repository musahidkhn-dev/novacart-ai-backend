import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { createStoreService, getMyStoreService } from "../services/storeService.js";
import ApiResponse from "../utils/apiResponse.js";

export const createStore = asyncHandler(async (req, res) => {
    const store = await createStoreService(req);

    return res.status(201).json(
        new ApiResponse(
            201,
            "Store created successfully",
            store
        )
    );
});

export const getMyStore = asyncHandler(async (req, res) => {
        const  store = await getMyStoreService(req.user._id);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Store fetched successfully",
                store
            )
        );
});