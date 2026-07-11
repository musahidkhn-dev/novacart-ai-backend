import Address from "../models/addressModel.js"


export const createAddress = (data) => {
    return Address.create(data);
}

export const findAddressByUser = (userId) => {
    return Address.find({ user: userId }).sort({
        isDefault: -1,
        createdAt: -1,
    });
}

export const findAddressById = (id) => {
    return Address.findById(id);
}

export const saveAddress = (address) => {
    return address.save();
}

export const deleteAddress = (id) => {
    return Address.findByIdAndDelete(id);
}

export const unsetDefaultAddress = (userId) => {
    return Address.updateMany(
        {
            user: userId,
            isDefault: true,
        },
        {
            $set: {
                isDefault: false,
            },
        }
    );
}

