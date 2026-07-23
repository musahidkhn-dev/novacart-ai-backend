import Product from "../models/productModel.js";

export const createProduct = (data) => {
    return Product.create(data);
}

export const findProductByNameAndStore = (name, storeId) => {
    return Product.findOne({ name, store: storeId, });
}

export const findProductBySlug = (slug) => {
    return Product.findOne({ slug })
            .populate("brand", "name slug")
            .populate("category", "name slug")
            .populate("store", "storeName slug");
}

export const getAllProducts = async(query) => {
    const {
        page = 1,
        limit = 10,
        search,
        category,
        brand,
        minPrice,
        maxPrice,
        sort = 'newest'
    } = query;

    const filter = {};

    if(search) {
        filter.name = {
            $regex: search,
            $options: "i",
        };
    }

    if(category) {
        filter.category = category;
    }

    if(brand) {
        filter.brand = brand;
    }

    if(minPrice || maxPrice) {
        filter.basePrice = {};

        if(minPrice) {
            filter.basePrice.$gte = Number(minPrice);
        }

        if(maxPrice) {
            filter.basePrice.$lte = Number(maxPrice);
        }
    }

    let sortOption = { createdAt: -1 };

    switch (sort) {
        case "price":
            sortOption = { basePrice:  1 };
            break;
        case "-price":
            sortOption = { basePrice: -1 };
            break;
        case "oldest":
            sortOption = { createdAt: 1 };
            break;
        case "newest":
        default:
            sortOption = { createdAt: -1 };
    }

    const skip = (Number(page) -1) * Number(limit);

    const [products, totalProducts] = await Promise.all([
         
        Product.find(filter)
            .populate("brand", "name slug")
            .populate("category", "name slug")
            .populate("store", "storeName slug")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit)),

        Product.countDocuments(filter)
    ]);

    return {
        products,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            totalProducts,
            totalPages: Math.ceil(totalProducts/ limit),
            hasNextPage: page < Math.ceil(totalProducts / limit),
            hasPrevPage: page > 1
        }
    };
}

export const updateProduct = (id, data) => {
    return Product.findByIdAndUpdate(id, data, {
        new: true,
    }); 
} 

export const deleteProduct = (id) => {
    return Product.findByIdAndDelete(id);
}

export const findProductById = (id) => {
    let product = Product.findById(id);
    
    return product
}
export const saveProduct = (product) => {
    return product.save();
}
