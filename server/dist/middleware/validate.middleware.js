export function validate(schema) {
    return function (req, res, next) {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
