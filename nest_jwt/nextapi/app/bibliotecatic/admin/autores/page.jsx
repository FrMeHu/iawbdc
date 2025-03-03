"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AutorForm from '@/componentes/autorForm';

export default function AdminAutores() {
  const [autores, setAutores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      router.push("/bibliotecatic");
      return;
    }

    // Obtener la lista de autores
    getAutores(token)
      .then((autoresData) => {
        setAutores(autoresData);
      })
      .catch((error) => {
        console.error("Error fetching autores:", error);
        if (error.message === "No token found" || error.message.includes("Failed to fetch")) {
          alert("Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.");
          localStorage.removeItem("token");
          router.push("/bibliotecatic");
        }
      });
  }, [router]);

  // Función para agregar un autor
  async function addAutor(formData) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      router.push("/bibliotecatic");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/autor", {
        method: "POST",
        body: JSON.stringify({
          nombre: formData.nombre,
          biografia: formData.biografia,
          fotoUrl: formData.fotoUrl,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const newAutor = await res.json();
        setAutores([...autores, newAutor]);
      } else {
        const errorData = await res.json();
        console.error("Failed to add autor:", errorData);
        alert("Error al agregar autor: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al agregar el autor.");
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Administrar Autores</h1>
      <AutorForm onSubmit={addAutor} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Autores</h2>
        {autores.length === 0 ? (
          <p>Cargando autores...</p>
        ) : (
          <ul className="space-y-4">
            {autores.map((autor) => (
              <li
                key={autor.id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <div>
                  <h3 className="text-xl">{autor.nombre}</h3>
                  <p className="text-gray-600">
                    {autor.biografia
                      ? autor.biografia.substring(0, 100) + '...'
                      : 'Biografía no disponible'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Función para obtener los autores
async function getAutores(token) {
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("http://localhost:5000/autor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch autores");
  }

  return await res.json();
}
