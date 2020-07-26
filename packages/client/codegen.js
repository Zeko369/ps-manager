module.exports = {
  schema: [
    {
      'http://localhost:4000/graphql': {
        // headers: {
        //     Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
        // },
      }
    }
  ],
  documents: ['./**/*.tsx', './**/*.ts'],
  overwrite: true,
  generates: {
    './graphql/index.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactCommonImportFrom: '@apollo/client',
        apolloReactComponentsImportFrom: '@apollo/client',
        apolloReactHocImportFrom: '@apollo/client',
        apolloReactHooksImportFrom: '@apollo/client'
      }
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};
