// deno-lint-ignore-file
import type { User, UserForCreation, UserForUpdate } from "../types/user.ts";
import { v1 } from "../deps.ts";

let users: User[] = [];

export const findUserById = (uuid: string) => {
  const user = users.find(u => u.uuid === uuid);
  if (!user) {
    throw new Error("User not found");
  } else {
    return user
  }
};

export const createUser = (user: UserForCreation) => {
  const existeUser = users.find(u => u.name === user.name)
  if (existeUser) {
    throw new Error("cant create the user");
  } else {
    return {
      uuid: v1.generate().toString(),
      name: user.name,
      birthDate: user.birthDate,
    };
  }
};

export const updateUser = (
  uuid: string,
  userForUpdate: UserForUpdate
) => {
  
const user = users.find(u => u.uuid === uuid);
  if (user) {
    const newUsers = users.map(user => {
      if(uuid == user.uuid){
        return {
          ...user, 
          ...userForUpdate
        }      
      }else{
        return user
      }
  
    })
    users = newUsers;
  } else {
    
    throw new Error("no existe el usuario con ese id")
  }

};


export const deleteUser = (uuid: string): boolean => {
  const user = users.find(u => u.uuid === uuid);
  if (user) {
    const newUsers = users.filter(user => uuid != user.uuid)
    users = newUsers;
    return true
  } else {    
    throw new Error("no existe el usuario con ese id")
    return false
  }
};
