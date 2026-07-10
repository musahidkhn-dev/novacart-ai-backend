const generateSKU = (productName, attribute) => {

    const productCode = productName
        .replace(/\s+/g,"")
        .substring(0,4)
        .toUpperCase();

    const attributeCode = attribute
        .map(attr => 
            attr.value
                .replace(/\s+/g,"")
                .substring(0,3)
                .toUpperCase(),
        ).join(".");

    return `${productCode}-${attributeCode}-${Date.now()}`;
};

export default generateSKU;