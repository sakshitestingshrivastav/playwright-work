import dotenv from 'dotenv';
dotenv.config();

function getEnv(variable: string): string {
  const value = process.env[variable];

  if (!value) {
    throw new Error(`Missing environment variable: ${variable}`);
  }

  return value;
}

export const ENV = {
  BASE_URL: getEnv("SWAG_BASE_URL"),
  USERNAME: getEnv("SWAG_USERNAME"),
  PASSWORD: getEnv("SWAG_PASSWORD"),
  PRODUCT_URL: getEnv("SWAG_PRODUCT_PAGE_URL"),
  SAUCE_LABS_URL: getEnv("SWAG_SAUCE_LABS_URL")
};