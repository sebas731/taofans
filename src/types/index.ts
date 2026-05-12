export interface Figurita {
  numero: number
  nombre: string
  pais: string
  grupo: string
}

export interface FiguitaFaltante {
  id: string
  user_id: string
  numero: number
  cantidad: number
  created_at: string
}

export interface Pedido {
  id: string
  user_id: string
  figuritas: number[]
  mensaje: string
  estado: 'pendiente' | 'procesado' | 'entregado'
  created_at: string
}

export interface UserProfile {
  id: string
  nombre: string
  email: string
  whatsapp?: string
  created_at: string
}

// Todos los stickers del álbum Mundial 2026 (estructura resumida, completa con los 670 aprox)
export const GRUPOS_MUNDIAL: Record<string, { pais: string; rango: [number, number] }[]> = {
  'Grupo A': [
    { pais: 'Argentina', rango: [1, 20] },
    { pais: 'Ecuador', rango: [21, 37] },
    { pais: 'Canadá', rango: [38, 54] },
    { pais: 'Chile', rango: [55, 71] },
  ],
  'Grupo B': [
    { pais: 'Brasil', rango: [72, 91] },
    { pais: 'Colombia', rango: [92, 108] },
    { pais: 'México', rango: [109, 125] },
    { pais: 'Paraguay', rango: [126, 142] },
  ],
  'Grupo C': [
    { pais: 'Alemania', rango: [143, 159] },
    { pais: 'Portugal', rango: [160, 176] },
    { pais: 'España', rango: [177, 193] },
    { pais: 'Marruecos', rango: [194, 210] },
  ],
  'Grupo D': [
    { pais: 'Francia', rango: [211, 227] },
    { pais: 'Inglaterra', rango: [228, 244] },
    { pais: 'Países Bajos', rango: [245, 261] },
    { pais: 'Senegal', rango: [262, 278] },
  ],
  'Grupo E': [
    { pais: 'Italia', rango: [279, 295] },
    { pais: 'Croacia', rango: [296, 312] },
    { pais: 'Japón', rango: [313, 329] },
    { pais: 'Arabia Saudita', rango: [330, 346] },
  ],
  'Grupo F': [
    { pais: 'Uruguay', rango: [347, 363] },
    { pais: 'Bolivia', rango: [364, 380] },
    { pais: 'Costa Rica', rango: [381, 397] },
    { pais: 'Australia', rango: [398, 414] },
  ],
  'Especiales': [
    { pais: 'Estadios', rango: [415, 430] },
    { pais: 'Trofeos & Logos', rango: [431, 440] },
    { pais: 'Brillantes', rango: [441, 460] },
  ],
}

export function generarFiguritas(): Figurita[] {
  const figuritas: Figurita[] = []
  Object.entries(GRUPOS_MUNDIAL).forEach(([grupo, paises]) => {
    paises.forEach(({ pais, rango }) => {
      for (let n = rango[0]; n <= rango[1]; n++) {
        figuritas.push({ numero: n, nombre: `${pais} #${n}`, pais, grupo })
      }
    })
  })
  return figuritas
}
