import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({
					success: false,
					message: "validation failed",
					error: error.details[0].message,
				});
		}
		next();
	};
};
