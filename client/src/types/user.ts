export type User = {
  id: string;   // Unique identifier for the user   
  displayName: string; // Display name of the user
  email: string; // Username of the user 
  token : string; // Optional token for authentication
  imageUrl?: string; // Optional URL for the user's profile image
}

export type LoginCreds = {
    email: string; // Username for login
    password: string; // Password for login
}

export type RegisterCreds = {
    email: string; // Username for login
    displayName: string; // Display name for the user
    password: string; // Password for login
}