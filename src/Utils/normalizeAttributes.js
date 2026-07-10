const normalizeAttributes = (attributes) => {

    return [...attributes].sort((a,b) => 
        a.name.localeCompare(b.name)
    );
};

export default normalizeAttributes;