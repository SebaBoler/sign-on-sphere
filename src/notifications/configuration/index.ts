export interface IConfiguration {
  postmark: {
    apiKey: string;
    from: string;
  };
}

export const notificationConfiguration = () => ({
  postmark: {
    apiKey: process.env.POSTMARK_API_KEY,
    from: process.env.POSTMARK_FROM,
  },
});
