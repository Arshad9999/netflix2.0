import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB62TD5u_6qW7qyhow05xaeBZgQ4BGgxqc",
    authDomain: "netflix-clone-3e4bd.firebaseapp.com",
    projectId: "netflix-clone-3e4bd",
    storageBucket: "netflix-clone-3e4bd.appspot.com",
    messagingSenderId: "744770687522",
    appId: "1:744770687522:web:da4a923267f3d331d3b07b"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db
