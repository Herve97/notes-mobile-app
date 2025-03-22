import { FlatList, View } from 'react-native'
import NoteItem from './NoteItem'
import React from 'react'

const NoteList = ({ notes,  onDelete, onEdit }: { notes: any[],  onDelete: any, onEdit: any }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
      />
    </View>
  )
}

export default NoteList
