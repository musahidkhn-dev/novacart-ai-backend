import ApiError from "../utils/apiError.js";
import { createAddress, deleteAddress, findAddressById, findAddressByUser, saveAddress, unsetDefaultAddress } from "../repositories/addressRepository.js";


export const createAddressService = async (userId, data) => {
    
    if(data.isDefault) {
        await unsetDefaultAddress(userId);
    }
    
    const address = await findAddressByUser(userId);

    if(address.length === 0) {
        data.isDefault = true;
    }

    return await createAddress({
        ...data,
        user: userId,
    });
};

export const getAllAddressService = async (userId,  data) => {
    
    const address = await findAddressByUser(userId);
   
    return address;
};

export const updateAddressService = async(userId, addressId) => {

    const address = await findAddressById(addressId);
    
    if(!address) {
        throw new ApiError(404, "Address not found.");
    }

    if(address.user.toString() !== userId.toString()) {
        throw new ApiError(403,"Unauthorized.");
    }

    if(data.isDefault) {
        await unsetDefaultAddress(userId);
    }
    
    Object.assign(address, data);

    return await saveAddress(address);
};

export const deleteAddressService = async(userId, addressId) => {

    const address = await findAddressById(addressId);

    if(!address) {
        throw new ApiError(404, "Address not found.");
    }

    if(address.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }
     const wasDefault = address.isDefault;

    await deleteAddress(addressId);

    if(wasDefault) {
        const address = await findAddressByUser(userId);

        if(address.length > 0) {
            address[0].isDefault = true;

            await saveAddress(address[0]);
        }
    }
    
    return true;
}

