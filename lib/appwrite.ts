import {
  Client,
  Avatars,
  Account,
  OAuthProvider,
  Databases,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.sym.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENPOINT,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_AGENTS_COLLECTION_ID,
  reviewCollectionId: process.env.EXPO_PUBLIC_REVIEW_COLLECTION_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_PROPERTIES_COLLECTION_ID,
};

// export const client = new Client()
//     .setEndpoint(config.endpoint!) // Your API Endpoint
//     .setProject(config.project!) // Your project ID
//     .setPlatform(config.platform!) // Your platform ID

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("682095a0003b260a650e")
  .setPlatform("com.sym.restate");
export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    const rederectUrl = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      rederectUrl
    );

    if (!response) {
      console.log("Login failed");
      return false;
    }

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      rederectUrl
    );

    if (browserResult.type !== "success") throw new Error("Login failed");

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      console.log("Login failed");
      return false;
    }

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Login  failed when creating session");

    return true;
  } catch (error) {
    console.log("Error logging in:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log("Error logging out:", error);
    return false;
  }
}

// export async function getCurrentUser() {
//      try {
//       const result = await account.get();
//       console.log("User data:", result);
//        if (result.$id) {
//   const userAvatar = avatar.getInitials(result.name.toString());
//   console.log("User avatar:", userAvatar);
// //         return {
// //           ...result,
// //    //       avatar: userAvatar.toString(),
// //         };
//        }

// //       return null;
//    } catch (error) {
// //       console.log(error);
// //       return null;
//     }
//   }
export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);
      console.log("User avatar:", userAvatar);
      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching latest properties:", error);
    return [];
  }
}


export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}


// write function to get property by id
export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
