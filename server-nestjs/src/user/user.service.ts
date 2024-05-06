import { Injectable } from '@nestjs/common';
import * as path from 'path';
import Datastore from 'nedb-promises';
import { User } from './user.interface';

@Injectable()
export class UserService {
 // private readonly db: Datastore<User>;
 private userList: User[] = [];

  constructor() {
   // this.db = Datastore.create({ filename: path.join(__dirname, 'users.db'), autoload: true });
 
    // Agregar algunos usuarios de ejemplo al iniciar el servicio
    this.seedUsers();
  }

  private async seedUsers() {
    // Verificar si ya hay usuarios en la lista
    if (this.userList.length === 0) {
      // Si no hay usuarios, agregar algunos de ejemplo a la lista
      this.userList = [
        { email: 'user1@example.com', password: 'password1' },
        { email: 'user2@example.com', password: 'password2' },
        { email: 'user3@example.com', password: 'password3' },
      ];
    }
  }
  
  async create(user: User) {
    console.log('user', user);
    // Verificar si el usuario ya existe en la lista
    const existingUser = this.userList.find(u => u.email === user.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    // Agregar el nuevo usuario a la lista
    this.userList.push(user);
    // Retornar el usuario creado
    return user;
  }
  
  async findAll(): Promise<User[]> {
    // Obtener todos los usuarios de la lista
    return this.userList;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    // Buscar un usuario en la lista por su email
    return this.userList.find(user => user.email === email) || null;
  }
}





/*import { Injectable } from '@nestjs/common';
import * as path from 'path';
import Datastore from 'nedb-promises';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly db: Datastore<User>;
  private userList: User[] = [

  ];

  constructor() {
    // this.db = Datastore.create(path.join(__dirname, 'users.db'));
  }

  async create(user: User) {
    console.log('user', user);
    // Agregar el usuario a la lista
    this.userList.push(user);
    // Retornar el usuario creado
    return user;
  }

  async remove(email: string): Promise<number> {
    // Eliminar el usuario de la lista por su email
    this.userList = this.userList.filter(user => user.email !== email);
    // Retornar el número de usuarios eliminados (en este caso, siempre será 1)
    return 1;
}

}*/
/*
  async create(user: User) {
    console.log('user', user);
    return await this.db.insert(user);
  }


  async remove(id: string): Promise<number> {
    return await this.db.remove({ _id: id }, {});
  }
}*/