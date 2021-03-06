module.exports = {
  images: {
    domains: ['localhost', 'host.docker.internal', 'ik.imagekit.io'],
  },
  env: {
    MEMES_ENDPOINT: process.env.MEMES_ENDPOINT,
    HOST_URL: process.env.HOST_URL,
    CONTENT_ENDPOINT: process.env.CONTENT_ENDPOINT,
    CRYPTO_MEME_CONTRACT: process.env.CRYPTO_MEME_CONTRACT,
    METADATA_URL: process.env.METADATA_URL,
    IMAGE_STORAGE_PUBLIC_KEY: process.env.IMAGE_STORAGE_PUBLIC_KEY,
    IMAGE_STORAGE_PRIVATE_KEY: process.env.IMAGE_STORAGE_PRIVATE_KEY,
    IMAGE_STORAGE_ENDPOINT: process.env.IMAGE_STORAGE_ENDPOINT,
    IMAGE_SERVER_AUTH_URL: process.env.IMAGE_SERVER_AUTH_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SECRET: process.env.SUPABASE_SECRET,
    RPC_URL: process.env.RPC_URL,
  },
};
