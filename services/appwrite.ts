import { Client, Databases, Account } from 'react-native-appwrite';
import { Platform } from 'react-native';

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  col: {
    notes: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
  },
};

// console.log("The config: ", config)

const client = new Client()
  .setEndpoint(`${config.endpoint}`)
  .setProject(`${config?.projectId}`)
  // .setPlatform(`${process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME}`);

switch (Platform.OS) {
  case 'ios':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID || '');
    break;
  case 'android':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME || '');
    break;
}

// export const createDatabase = () => new Databases(new Client()
//   .setEndpoint(config.endpoint || '')
//   .setProject(config?.projectId || '')
//   .setPlatform(`${process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME}`)
//   // Add platform configuration here
// );

const database = new Databases(client);

const account = new Account(client);

export { database, config, client, account };
