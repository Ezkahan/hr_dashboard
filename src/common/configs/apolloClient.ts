import { ApolloClient, InMemoryCache} from "@apollo/client";
import i18next from "i18next";

export const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
    headers: {
      'Accept-Language' : i18next.language
    }
});