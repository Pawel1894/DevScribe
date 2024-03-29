import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	type RmqContext,
	type RmqOptions,
	Transport,
} from "@nestjs/microservices";
import { type SharedServiceInterface } from "./shared.service.interface";
import EnvVariables from "../env/env.variables";

@Injectable()
export class SharedService implements SharedServiceInterface {
	constructor(private readonly configService: ConfigService) {}

	getRmqOptions(queue: string): RmqOptions {
		const USER = this.configService.get<string>(EnvVariables.RABBITMQ_USER);
		const PASSWORD = this.configService.get<string>(EnvVariables.RABBITMQ_PASS);
		const HOST = this.configService.get<string>(EnvVariables.RABBITMQ_HOST);

		return {
			transport: Transport.RMQ,
			options: {
				urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
				noAck: false,
				queue,
				queueOptions: {
					durable: true,
				},
			},
		};
	}

	acknowledgeMessage(context: RmqContext) {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		channel.ack(message);
	}
}
