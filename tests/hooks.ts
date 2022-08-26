/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    env: {
      apiUrl: string;
    };
  }
}

declare const window: any;

export const mochaHooks = function () {
  return {
    async beforeEach() {
      // @ts-ignore
      // noinspection JSConstantReassignment
      global.window = {
        // @ts-ignore
        location: {
          // @ts-ignore
          protocol: {},
        },
        // @ts-ignore
        localStorage: {
          // @ts-ignore
          setItem: (key, value: any) => {
            return null;
          },
          // @ts-ignore
          getItem: (key) => {
            return null;
          },
        },
      };
      window.env = {};
    },
  };
};