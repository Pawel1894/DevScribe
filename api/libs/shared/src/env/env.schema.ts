import * as Joi from "joi";

const EnvSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid("development", "production", "test", "provision")
		.default("development"),
	PORT: Joi.number().default(3000),

	RABBITMQ_DEFAULT_USER: Joi.string().required(),
	RABBITMQ_DEFAULT_PASS: Joi.string().required(),
	RABBITMQ_USER: Joi.string().required(),
	RABBITMQ_PASS: Joi.string().required(),
	RABBITMQ_HOST: Joi.string().required(),
	RABBITMQ_AUTH_QUEUE: Joi.string().required(),
	RABBITMQ_USER_QUEUE: Joi.string().required(),
	RABBITMQ_POST_QUEUE: Joi.string().required(),

	POSTGRES_USER: Joi.string().required(),
	POSTGRES_PASSWORD: Joi.string().required(),
	POSTGRES_DB: Joi.string().required(),
	POSTGRES_PORT: Joi.number().required(),
	POSTGRES_HOST: Joi.string().required(),

	PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
	PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),

	JWT_SECRET: Joi.string().required(),
	JWT_EXPIRATION_TIME: Joi.string().required(),
});

export default EnvSchema;
