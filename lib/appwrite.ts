import {Account, Avatars, Client, Databases, ID, TablesDB} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: 'com.nathan.greenkikapu',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATSBASE_ID,
    userTableId:"user",
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform!)

export const account = new Account(client);
// export const databases = new Databases(client);
const avatars = new Avatars(client);
export const tablesDB = new TablesDB(client)

export const createUser = async ({name,email,password}:CreateUserParams) => {
    try {
        const newAccount = await account.create({
            userId:ID.unique(),
            email,
            password
        });
        if (!newAccount) throw new Error;

        await signIn({email,password});

        const avatarUrl = avatars.getInitialsURL(name)

       await tablesDB.createRow({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.userTableId,
            rowId: ID.unique(),
            data: { accountId: newAccount.$id, email, name, avatar: avatarUrl },

        });

    }catch(error){
        throw new Error(error as string)
    }
}

export const signIn = async ({email,password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({email,password});
    }catch (error) {
        throw new Error(error as string)
    }
}