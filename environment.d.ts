declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        PWD: string;
        PRIVATE_STRIPE_KEY: string,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string,
      }
    }
  }

  export {}