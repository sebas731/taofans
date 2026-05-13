export interface Figurita {
  codigo: string
  pais: string
  grupo: string
  especial?: boolean
}

export interface Pais {
  nombre: string
  codigo: string
  bandera: string
  grupo: string
  total: number
}

export const GRUPOS: Record<string, Pais[]> = {
  'Especiales': [
    { nombre: 'FIFA World Cup', codigo: 'FWC', bandera: '🏆', grupo: 'Especiales', total: 19 },
    { nombre: 'Coca-Cola',      codigo: 'CC',  bandera: '🥤', grupo: 'Especiales', total: 14 },
  ],
  'Grupo A': [
    { nombre: 'México',         codigo: 'MEX', bandera: '🇲🇽', grupo: 'Grupo A', total: 20 },
    { nombre: 'Sudáfrica',      codigo: 'RSA', bandera: '🇿🇦', grupo: 'Grupo A', total: 20 },
    { nombre: 'Corea del Sur',  codigo: 'KOR', bandera: '🇰🇷', grupo: 'Grupo A', total: 20 },
    { nombre: 'Rep. Checa',     codigo: 'CZE', bandera: '🇨🇿', grupo: 'Grupo A', total: 20 },
  ],
  'Grupo B': [
    { nombre: 'Canadá',         codigo: 'CAN', bandera: '🇨🇦', grupo: 'Grupo B', total: 20 },
    { nombre: 'Bosnia',         codigo: 'BIH', bandera: '🇧🇦', grupo: 'Grupo B', total: 20 },
    { nombre: 'Qatar',          codigo: 'QAT', bandera: '🇶🇦', grupo: 'Grupo B', total: 20 },
    { nombre: 'Suiza',          codigo: 'SUI', bandera: '🇨🇭', grupo: 'Grupo B', total: 20 },
  ],
  'Grupo C': [
    { nombre: 'Brasil',         codigo: 'BRA', bandera: '🇧🇷', grupo: 'Grupo C', total: 20 },
    { nombre: 'Marruecos',      codigo: 'MAR', bandera: '🇲🇦', grupo: 'Grupo C', total: 20 },
    { nombre: 'Haití',          codigo: 'HAI', bandera: '🇭🇹', grupo: 'Grupo C', total: 20 },
    { nombre: 'Escocia',        codigo: 'SCO', bandera: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', grupo: 'Grupo C', total: 20 },
  ],
  'Grupo D': [
    { nombre: 'Estados Unidos', codigo: 'USA', bandera: '🇺🇸', grupo: 'Grupo D', total: 20 },
    { nombre: 'Paraguay',       codigo: 'PAR', bandera: '🇵🇾', grupo: 'Grupo D', total: 20 },
    { nombre: 'Australia',      codigo: 'AUS', bandera: '🇦🇺', grupo: 'Grupo D', total: 20 },
    { nombre: 'Turquía',        codigo: 'TUR', bandera: '🇹🇷', grupo: 'Grupo D', total: 20 },
  ],
  'Grupo E': [
    { nombre: 'Alemania',       codigo: 'GER', bandera: '🇩🇪', grupo: 'Grupo E', total: 20 },
    { nombre: 'Curazao',        codigo: 'CUW', bandera: '🇨🇼', grupo: 'Grupo E', total: 20 },
    { nombre: 'Costa de Marfil',codigo: 'CIV', bandera: '🇨🇮', grupo: 'Grupo E', total: 20 },
    { nombre: 'Ecuador',        codigo: 'ECU', bandera: '🇪🇨', grupo: 'Grupo E', total: 20 },
  ],
  'Grupo F': [
    { nombre: 'Países Bajos',   codigo: 'NED', bandera: '🇳🇱', grupo: 'Grupo F', total: 20 },
    { nombre: 'Japón',          codigo: 'JPN', bandera: '🇯🇵', grupo: 'Grupo F', total: 20 },
    { nombre: 'Suecia',         codigo: 'SWE', bandera: '🇸🇪', grupo: 'Grupo F', total: 20 },
    { nombre: 'Túnez',          codigo: 'TUN', bandera: '🇹🇳', grupo: 'Grupo F', total: 20 },
  ],
  'Grupo G': [
    { nombre: 'Bélgica',        codigo: 'BEL', bandera: '🇧🇪', grupo: 'Grupo G', total: 20 },
    { nombre: 'Egipto',         codigo: 'EGY', bandera: '🇪🇬', grupo: 'Grupo G', total: 20 },
    { nombre: 'Irán',           codigo: 'IRN', bandera: '🇮🇷', grupo: 'Grupo G', total: 20 },
    { nombre: 'Nueva Zelanda',  codigo: 'NZL', bandera: '🇳🇿', grupo: 'Grupo G', total: 20 },
  ],
  'Grupo H': [
    { nombre: 'España',         codigo: 'ESP', bandera: '🇪🇸', grupo: 'Grupo H', total: 20 },
    { nombre: 'Cabo Verde',     codigo: 'CPV', bandera: '🇨🇻', grupo: 'Grupo H', total: 20 },
    { nombre: 'Arabia Saudita', codigo: 'KSA', bandera: '🇸🇦', grupo: 'Grupo H', total: 20 },
    { nombre: 'Uruguay',        codigo: 'URU', bandera: '🇺🇾', grupo: 'Grupo H', total: 20 },
  ],
  'Grupo I': [
    { nombre: 'Francia',        codigo: 'FRA', bandera: '🇫🇷', grupo: 'Grupo I', total: 20 },
    { nombre: 'Senegal',        codigo: 'SEN', bandera: '🇸🇳', grupo: 'Grupo I', total: 20 },
    { nombre: 'Irak',           codigo: 'IRQ', bandera: '🇮🇶', grupo: 'Grupo I', total: 20 },
    { nombre: 'Noruega',        codigo: 'NOR', bandera: '🇳🇴', grupo: 'Grupo I', total: 20 },
  ],
  'Grupo J': [
    { nombre: 'Argentina',      codigo: 'ARG', bandera: '🇦🇷', grupo: 'Grupo J', total: 20 },
    { nombre: 'Argelia',        codigo: 'ALG', bandera: '🇩🇿', grupo: 'Grupo J', total: 20 },
    { nombre: 'Austria',        codigo: 'AUT', bandera: '🇦🇹', grupo: 'Grupo J', total: 20 },
    { nombre: 'Jordania',       codigo: 'JOR', bandera: '🇯🇴', grupo: 'Grupo J', total: 20 },
  ],
  'Grupo K': [
    { nombre: 'Portugal',       codigo: 'POR', bandera: '🇵🇹', grupo: 'Grupo K', total: 20 },
    { nombre: 'Rep. del Congo', codigo: 'COD', bandera: '🇨🇩', grupo: 'Grupo K', total: 20 },
    { nombre: 'Uzbekistán',     codigo: 'UZB', bandera: '🇺🇿', grupo: 'Grupo K', total: 20 },
    { nombre: 'Colombia',       codigo: 'COL', bandera: '🇨🇴', grupo: 'Grupo K', total: 20 },
  ],
  'Grupo L': [
    { nombre: 'Inglaterra',     codigo: 'ENG', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', grupo: 'Grupo L', total: 20 },
    { nombre: 'Croacia',        codigo: 'CRO', bandera: '🇭🇷', grupo: 'Grupo L', total: 20 },
    { nombre: 'Ghana',          codigo: 'GHA', bandera: '🇬🇭', grupo: 'Grupo L', total: 20 },
    { nombre: 'Panamá',         codigo: 'PAN', bandera: '🇵🇦', grupo: 'Grupo L', total: 20 },
  ],
}

export function generarFiguritasAlbum(): Figurita[] {
  const figuritas: Figurita[] = []
  Object.entries(GRUPOS).forEach(([grupo, paises]) => {
    paises.forEach((pais) => {
      for (let n = 1; n <= pais.total; n++) {
        figuritas.push({
          codigo: `${pais.codigo}${n}`,
          pais: pais.nombre,
          grupo,
          especial: grupo === 'Especiales',
        })
      }
    })
  })
  return figuritas
}

// Compatibilidad con código anterior
export const GRUPOS_MUNDIAL = GRUPOS
export function generarFiguritas() { return generarFiguritasAlbum() }