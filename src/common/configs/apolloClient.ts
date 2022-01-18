import { ApolloClient, InMemoryCache} from "@apollo/client";
import i18next from "i18next";
import Cookies from "js-cookie";

const token = Cookies.get('orlan_token')

export const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    // uri: 'http://72.167.34.20/graphql',
    cache: new InMemoryCache(),
    headers: {
      'Accept-Language' : i18next.language,
      'Authorization': token ? `Bearer ${token}` : ''
    }
});