import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server/node_modules/apollo-server-core";
import { schema } from './schema';
import { context } from './context';

export const server = new ApolloServer({
    schema,
    context,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault()
    ]
})

server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });