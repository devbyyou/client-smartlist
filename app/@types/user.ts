export interface LoginResponse {
  logged: boolean
  pseudo: string
  token:Token
}

export interface Token {
//   user: User
//   joueur: Joueur
  token: string
}
// export interface User {
//   id: number
//   nom: string
//   prenom: string
//   email: string
//   tel: string
//   role: string
//   password?: string
//   date_creation: string | number
//   last_activity: string
//   logo: string
//   statut: string
//   session_id: string | null
//   created_at: string
//   updated_at: string
//   equipes: Equipe[]
//   banniere: string,
// }
// export interface Equipe {
//   created_at: string
//   id: number
//   nom: string
//   logo?: string
//   statut: string
//   categorie_id: number
//   joueurs: Joueur[]
//   seances: Seances[]
//   categories: Categories
//   coaches_equipes: CoachesEquipes
// }
// export interface Joueur {
//   created_at: number | string
//   categorie_id: number
//   id: number
//   nom: string
//   prenom: string
//   email: string
//   derniere_activite: string | number
//   tel:number
//   date_creation: string
//   equipe : []
//   statut:string
//   logo:string
//   role:string
//   age:number
//   etat:string
//   equipe_id:number
//   password:string
//   updated_at:number
// }
// export interface Seances {
//   id:number
//   categorie_id: number
//   date:string
//   equipe_id: number
//   heure:string
//   horaire:string
//   lieu:string
//   presences: Presences[]
// }
// export interface Presences {
//   statut: string,
//   id: number,
//   joueur_id: number,
//   seance_id: number,
//   absence: string,
//   retard: string,
//   created_at: string,
//   updated_at:string,
//   JoueurId: number

// }

// export interface Categories {
//   id: string
//   nom: string
//   tranche_age: string
//   nombre_total: number
// }

// export interface CoachesEquipes {
//   created_at: string
//   updated_at: string
//   coach_id: number
//   equipe_id: number
// }
