import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const noteService = {
  // Get Notes
  async getNotes(userId: any) {
    if (!userId) {
      console.error('Error: Missing userId in getNotes()');
      return {
        data: [],
        error: 'User ID is missing',
      };
    }

    try {
      
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal('user_id', userId),
      ]);
      // console.log("The response fetching: ", response)
      return response;
    } catch (error: any) {
      // console.log("Error fetching notes:", error.message);
      return { data: [], error: error.message };
    }
  },
  // Add New Note
  async addNote(user_id: any, text: string) { 
    if (!text) {
      return { error: "Note text cannot be empty" };
    }

    const data = {
      text: text,
      createdAt: new Date().toISOString(),
      user_id: user_id,
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );

    // console.log("Response on save: ", response);

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Update Note
  async updateNote(id: any, text: string) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Delete Note
  async deleteNote(id: any) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default noteService;
