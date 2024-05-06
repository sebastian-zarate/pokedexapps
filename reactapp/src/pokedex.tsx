import { useEffect, useState } from "react"

type Pokemon = {
  id: string
  name: string
}

const BASE_URL = 'http://localhost:3000'

export function Pokedex() {
  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);


  useEffect(() => {
    let cancelled = false
    fetch(`${BASE_URL}/pokemon?page=${page}`) 
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!cancelled) {
          setList(data.list)
          setPageCount(data.count)
        }
      })

    return () => {
      cancelled = true
    }
  }, [page])

  useEffect(() => {
    const hasAuth = !!window.localStorage.getItem("jwt");
    setAuth(hasAuth)
    if(!hasAuth) {
      window.location.replace("/login")
    }
  }, [setAuth]);

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: data.get('id') as string,
      name: data.get('name') as string
    }
    console.log(pokemon)
    try {
      const response = await fetch(`${BASE_URL}/pokemon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon)
      });

      if (!response.ok) {
        throw new Error(`Failed to add Pokémon: ${response.statusText}`);
      }

      form.reset();

      if (page === pageCount && list.length < 5) {
        setList((currentList) => [...currentList, pokemon]);
      }
      setPageCount((currentPageCount) => currentPageCount + 1);
      setErrorMessage(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      console.error('El pokemons ya existe');
      setErrorMessage('El pokemon ya existe');
    }
  }

  const handleInputChange = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  async function deletePokemon(id: string) {
    await fetch(`${BASE_URL}/pokemon/${id}`, {
      method: 'DELETE'
    })

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setPageCount(current => current - 1)

    if (page >= pageCount) {
      setPage(page - 1)
    }
  }

  if(!auth) {
    return ""
  }

  return (
    <main className="container mx-auto flex flex-col">
		<h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
		<form action="/api/pokemon" method="post" onSubmit={addPokemon}>
			<h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
			<input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" onChange={handleInputChange}/>
			<input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" onChange={handleInputChange} />
      {errorMessage && <div className=" justify-center p-1 bg-red-700 flex text-white rounded-lg border-2 border-red-700 ">{errorMessage}</div>}
			<button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
      {/* <Link to="/login">Button</Link> */}
		</form>
		<ul className="mt-4 border-4 border-red-700">
			<li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
				<span className="text-lg text-white font-extrabold w-1/3">ID</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
			</li>
			{list.map(pokemon => (
				<li key={pokemon.id} className="flex items-center justify-between border-b border-gray-300 p-2">
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
      <button onClick={() => setPage(page === pageCount ? page : page + 1 )} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
	</main>
  )
}