export abstract class ISecretsAdapter {
  ENV!: string;

  LOG_LEVEL!: string;

  KAFKA_BROKER!: string;

  DATE_FORMAT!: string;

  TZ!: string;

  API!: {
    COMMANDS: {
      PORT: number | string,
      HOST: string,
      DATABASE: {
        HOST: string,
        PORT: number | string,
        USER: string,
        PASSWORD: string,
        DATABASE: string
      },
      KAFKA: {
        CLIENT_ID: string,
        GROUP_ID: string
      }
    },
    QUERIES: {
      PORT: number | string,
      HOST: string,
      DATABASE: {
        HOST: string,
        PORT: number | string,
        USER: string,
        PASSWORD: string,
        DATABASE: string
      },
      KAFKA: {
        CLIENT_ID: string,
        GROUP_ID: string
      }
    },

  }

  IS_LOCAL!: boolean;

  IS_PRODUCTION!: boolean;
}
