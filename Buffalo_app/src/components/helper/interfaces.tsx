export interface Exercise {
    id: string,
    name: string,
    video: string,
    description: string,
    muscle: string,
    sets: number,
    repetitions: number,
    equipment: string,
    intensity: string,
    time: string,
}

export interface User {
    id: string,
    name: string,
    email: string,
    photoUrl?: string,
    phoneNumber?: string,
    age?: number,
    weight?: number,
    height?: number,
    gender?: string,
    subscription?: string,
    time?: number,
    myWorkouts?: Workout[],
    isAuthenticated: boolean,
}

export interface Workout {
    id: string,
    name: string,
    description: string,
    image: string,
    time: string,
    intensity: string
    subscription: string,
    exercises: Exercise[]
}

export interface PickerProps { 
    min: number; 
    max: number; 
}