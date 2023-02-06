export const getEnvVariables = () => {
  const enviroments = import.meta.env;

  return {
    ...enviroments,
  };
};
