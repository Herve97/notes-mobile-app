import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const NoteItem = ({ note, onDelete, onEdit }: {note: any, onDelete: any, onEdit: any}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef<any>(null);

  const handleSave = () => {
    if (editedText.trim() === '') return;
    onEdit(note.$id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType='done'
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
              inputRef.current?.blur();
            }}
          >
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
    // <View style={styles.noteItem}>
    //   <Text style={styles.noteText}>{note.text}</Text>
    // </View>
  )
}

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5
  },
  noteText: {
    fontSize: 18
    // fontWeight: 'bold'
  },
  delete: {
    fontSize: 18,
    color: 'red',
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15
  }
})

export default NoteItem
