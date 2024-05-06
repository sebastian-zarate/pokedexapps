import React, { useEffect, useState } from "react";
//import { Route, BrowserRouter, Routes } from "react-router-dom";
//import { Pokedex } from "./pokedex";
//import { Login } from "./login";
//import { SignUp } from "./singnUp";





type Pokemon = {
  id: number;
  name: string;
};

//const BASE_URL = 'http://localhost:4321/api';
//const BASE_URL = 'http://localhost:3000/'
export  function App() {
  //return(
   // <BrowserRouter>
     //   <Routes>
       //     <Route path="/" element={<Pokedex/>}></Route>
        //    <Route path="/login" element={<Login/>}></Route>
       //     <Route path="/admin" element={<SignUp/>}></Route>
       // </Routes>
   // </BrowserRouter>
//)
 // const [list, setList] = useState<Pokemon[]>([]);
 // const [page, setPage] = useState(1);
 // const [pageCount, ] = useState(1);
 const [list, setList] = useState<Pokemon[]>([])
 const [page, setPage] = useState(1)
 const [count, ] = useState(0)
 const pageCount = Math.ceil(count / 5)
  useEffect(() => {
    let cancelled = false
    fetch('http://localhost:3000/pokemon')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setList(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching Pokémon:', error);
      });

    return () => {
      cancelled = true
    }
  }, [page])




/*/
  useEffect(() => {
    let cancelled = false;
    fetch('http://localhost:3000/pokemon')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setList(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching Pokémon:', error);
      });
  
    return () => {
      cancelled = true;
    };
  }, []);
*/
  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const form = event.currentTarget;
    const data = new FormData(form);
    const id = parseInt(data.get("id") as string );
    const name = data.get("name") as string ;
  
    const pokemon = {
      id: id,
      name: name,
    };
  
    try {
      const response = await fetch('http://localhost:3000/pokemon', { // Cambiar la URL aquí
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemon),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add Pokémon: ${response.statusText}`);
      }
  
      form.reset();
  
      // Agregar el nuevo Pokémon a la lista después de la solicitud POST exitosa
      setList((currentList) => [...currentList, pokemon]);
    } catch (error) {
      console.error("Error adding pokemon:", error);
    }
  }


  async function deletePokemon(id: number) {
    try {
        await fetch(`http://localhost:3000/pokemon/${id}`, {
            method: "DELETE",
        });

        // Filtrar la lista para eliminar el Pokémon con el id dado
        setList((currentList) => currentList.filter((pokemon) => pokemon.id !== id));

        // Verificar si hay Pokémon restantes en la lista después de eliminar
        const remainingPokemons = list.filter((pokemon) => pokemon.id !== id).length;

        // Calcular la nueva cantidad de páginas
        const newPageCount = Math.ceil(remainingPokemons / 5);

        // Verificar si la página actual es mayor que el nuevo número de páginas
        if (page > newPageCount) {
            // Disminuir la página actual si es mayor que el nuevo número de páginas
            setPage(newPageCount);
        }
    } catch (error) {
        console.error("Error deleting pokemon:", error);
    }
}

  return (
    <main className="container mx-auto flex flex-col">
      <h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
      <form action="/api/pokemon" method="post" onSubmit={addPokemon}>
        <h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
        <input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
      </form>
      <ul className="mt-4 border-4 border-red-700">
        <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
          <span className="text-lg text-white font-extrabold w-1/3">ID</span>
          <span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
          <span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
        </li>
        {list.map((pokemon) => (
          <li className="flex items-center justify-between border-b border-gray-300 p-2" key={pokemon.id}>
            <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
            <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
            <div className="w-1/3 text-right">
              <button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-2">
        <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
        <span className="flex items-center self-stretch">{page}</span>
        <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
      </div>
    </main>
  )


  
}
