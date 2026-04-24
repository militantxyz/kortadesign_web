declare module "nodemailer" {
  export type MailAddressLike = string | { address: string; name?: string };

  export interface SendMailOptions {
    from?: MailAddressLike;
    to?: MailAddressLike | MailAddressLike[];
    subject?: string;
    text?: string;
    html?: string;
    replyTo?: MailAddressLike;
    [key: string]: unknown;
  }

  export interface Transporter {
    verify(): Promise<unknown>;
    sendMail(mailOptions: SendMailOptions): Promise<unknown>;
  }

  export interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
    connectionTimeout?: number;
    greetingTimeout?: number;
    socketTimeout?: number;
    [key: string]: unknown;
  }

  const nodemailer: {
    createTransport(options: TransportOptions): Transporter;
  };

  export default nodemailer;
}
