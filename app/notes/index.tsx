import AddNoteModal from '@/components/AddNoteModal'
import NoteList from '@/components/NoteList'
import authService from '@/services/authService'
import noteService from '@/services/noteService'
import { useRouter, Redirect } from 'expo-router'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native'

const NoteScreen = () => {
  const [notes, setNotes] = useState<any[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // const user = authService.getUser();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
     checkUser();
    //  return <Redirect href={user ? '/(tabs)/chats' : '/(auth)/login'} />;
    console.log("The user: ", user)
    if (!user) {
      // router.push('/auth');
      router.replace('/auth' as any);
    }
  }, [user]);


  useEffect(() => {
    if (user) {
      fetchNotes()
    }
    
  }, [user])

  const fetchNotes = async () => {
    const response = await noteService.getNotes(user?.$id)
    if (response.error) {
      setError(response.error)
      Alert.alert('Error', response.error)
    } else {
      setNotes(response.data)
      setError(null)
    }

    setLoading(false)
    // try {
    //   const response = await noteService.getNotes()
    //   console.log('The fetch response: ', response)
    //   setNotes(response.data as any)
    //   // setLoading(false);
    // } catch (error: any) {
    //   setError(error)
    //   setLoading(false)
    // }
  }

  const checkUser = async () => {
    setLoading(true);
    const response: any = await authService.getUser();

    if (response?.error) {
      setUser(null);
      // return <Redirect href={'/auth'} />
    } else {
      setUser(response);
    }

    setLoading(false);
  };

  const addNote = async () => {
    if (newNote.trim() === '') return
    const response: any = await noteService.addNote(user?.$id, newNote)
    if (response.error) {
      Alert.alert('Error', response.error)
    } else {
      setNotes([...notes, response?.data])
    }
    setNewNote('')
    setModalVisible(false)
  }

  // Delete Note
  const deleteNote = async (id: any) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await noteService.deleteNote(id)
          if (response.error) {
            Alert.alert('Error', response.error)
          } else {
            setNotes(notes.filter(note => note.$id !== id))
          }
        }
      }
    ])
  }

  // Edit Note
  const editNote = async (id: any, newText: any) => {
    if (!newText.trim()) {
      Alert.alert('Error', 'Note text cannot be empty')
      return
    }

    const response = await noteService.updateNote(id, newText)
    if (response.error) {
      Alert.alert('Error', response.error)
    } else {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.$id === id
            ? { ...note, text: (response?.data as any)?.text }
            : note
        )
      )
    }
  }

  return (
    <View style={styles.container}>
      {/* <NoteList notes={notes} /> */}
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {notes.length === 0 ? (
            <Text style={styles.noNotesText}>You have no notes</Text>
          ) : (
            <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
          )}
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
      {/* Modal */}
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15
  }
})

export default NoteScreen
