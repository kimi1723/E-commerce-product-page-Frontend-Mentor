declare module 'nodemailer-sendgrid-transport' {
	import { TransportOptions } from 'nodemailer';

	interface SendGridOptions {
		auth: {
			api_key: string;
		};
	}

	function sendgrid(options: SendGridOptions): TransportOptions;

	export = sendgrid;
}
