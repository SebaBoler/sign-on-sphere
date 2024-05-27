export interface IConfiguration {
  database: {
    url: string;
  };
}
export const userConfiguration = () => ({
  dabatase: {
    url: process.env.DATABASE_URL,
  },
});
