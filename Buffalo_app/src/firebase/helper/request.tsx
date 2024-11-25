import { addDoc, collection, doc, Firestore, getDocs, updateDoc } from "firebase/firestore"
import { Firestoredb } from "../firebaseConfig"
import { exercises } from "../data/mockUpExercises";



const ExerciseCollection = collection(Firestoredb, "Exercises");

export const uploadExercises  = async () => {
    for (const Exercises of exercises){
        await addDoc(ExerciseCollection,Exercises)
    }
    console.log("Productos agregados exitosamente")
}

export const getExercises = async () => {
    const data = await getDocs(ExerciseCollection);
    console.log(data.docs)
    return data.docs.map((doc) => ({
        ...doc.data(),
    }))
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateInfoUser = async (userId: string, updates: { [key: string]: any }) => {

    if(!userId){ Error('No User id provided')}


          
    try{
        console.log("funcion actualizar ejecutada");
        const userUpdateDoc = doc(Firestoredb, "users", userId)
        await updateDoc(userUpdateDoc, updates)
        console.log("Datos actualizados correctamente.");
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
    }
}