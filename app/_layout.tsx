import authService from '@/services/authService'
import { Slot, Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const HeaderLogout = () => {
  const [user, setUser] = useState<any>(null)
  // const { user, logout } = useAuth();
  useEffect(() => {
    const checkUser = async () => {
      const response: any = await authService.getUser()

      if (response?.error) {
        setUser(null)
      } else {
        setUser(response)
      }
    }
    checkUser()
  }, [user])

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={authService.logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null
}

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff8c00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerRight: () => <HeaderLogout />,
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: '#fff'
        }
      }}
    >
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
      <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff3b30',
    borderRadius: 8
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default RootLayout
