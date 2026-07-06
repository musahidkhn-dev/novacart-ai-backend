import slugify from "slugify";

const generateUniqueSlug = async ( Model, value, slugField = "slug" ) => {
        let slug = slugify(value, {
            lower: true,
            strict: true,
            trim: true,
        });

        let uniqueSlug = slug;
        
        let counter = 1;

        while(
            await Model.findOne({
                [slugField]: uniqueSlug,
            })
        ) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }

        return uniqueSlug;
}

export default generateUniqueSlug;