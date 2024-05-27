export interface IConfiguration {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export const authConfiguration = () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
