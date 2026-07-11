import { createAddressService, deleteAddressService, getAllAddressService, updateAddressService } from "../services/addressService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



export const createAddress = asyncHandler(async(req,res) => {

    const address = await createAddressService(
        req.user._id,
        req.validatedData
    );

    return res.status(201).json(
        new ApiResponse(201, "Address created successfully.", address)
    );
});

export const getAllAddresses = asyncHandler(async(req,res) => {

    const address = await getAllAddressService(req.user._id);
    
    return res.status(200).json(
        new ApiResponse(201, "Address fetched successfully.", address)
    );
});

export const updateAddress = asyncHandler(async(req,res) => {

    const address = await updateAddressService(
        req.user._id,
        req.params.id,
        req.validatedData,
    );

    return res.status(200).json(
        new ApiResponse(200, "Address updated successfully.", address)
    );
})

export const deleteAddress = asyncHandler(async(req, res) => {

    const address = await deleteAddressService(
        req.user._id,
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(200, "Address deleted successfully.")
    );
})

