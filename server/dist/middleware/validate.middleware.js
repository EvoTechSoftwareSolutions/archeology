export function validate(schema) {
    return function (req, res, next) {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
