const generateVariantKey = (attribute) => {
     return attribute
        .map(attr => `${attr.name}:${attr.value}`)
        .join("|");
};

export default generateVariantKey;