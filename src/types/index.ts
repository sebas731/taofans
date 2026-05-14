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
  iso: string  // código ISO 2 letras para flagcdn
}

export const GRUPOS: Record<string, Pais[]> = {
  'Especiales': [
    { nombre: 'FIFA World Cup', codigo: 'FWC', bandera: '🏆', grupo: 'Especiales', total: 19, iso: '' },
    { nombre: 'Coca-Cola', codigo: 'CC', bandera: '🥤', grupo: 'Especiales', total: 14, iso: '' },
  ],
  'Grupo A': [
    { nombre: 'México', codigo: 'MEX', bandera: '🇲🇽', grupo: 'Grupo A', total: 20, iso: 'mx' },
    { nombre: 'Sudáfrica', codigo: 'RSA', bandera: '🇿🇦', grupo: 'Grupo A', total: 20, iso: 'za' },
    { nombre: 'Corea del Sur', codigo: 'KOR', bandera: '🇰🇷', grupo: 'Grupo A', total: 20, iso: 'kr' },
    { nombre: 'Rep. Checa', codigo: 'CZE', bandera: '🇨🇿', grupo: 'Grupo A', total: 20, iso: 'cz' },
    ],
  'Grupo B': [
    { nombre: 'Canadá', codigo: 'CAN', bandera: '🇨🇦', grupo: 'Grupo B', total: 20, iso: 'ca' },
    { nombre: 'Bosnia', codigo: 'BIH', bandera: '🇧🇦', grupo: 'Grupo B', total: 20, iso: 'ba' },
    { nombre: 'Qatar', codigo: 'QAT', bandera: '🇶🇦', grupo: 'Grupo B', total: 20, iso: 'qa' },
    { nombre: 'Suiza', codigo: 'SUI', bandera: '🇨🇭', grupo: 'Grupo B', total: 20, iso: 'ch' },
    ],
  'Grupo C': [
    { nombre: 'Brasil', codigo: 'BRA', bandera: '🇧🇷', grupo: 'Grupo C', total: 20, iso: 'br' },
    { nombre: 'Marruecos', codigo: 'MAR', bandera: '🇲🇦', grupo: 'Grupo C', total: 20, iso: 'ma' },
    { nombre: 'Haití', codigo: 'HAI', bandera: '🇭🇹', grupo: 'Grupo C', total: 20, iso: 'ht' },
    { nombre: 'Escocia', codigo: 'SCO', bandera: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', grupo: 'Grupo C', total: 20, iso: 'gb-sct' },
    ],
  'Grupo D': [
    { nombre: 'Estados Unidos', codigo: 'USA', bandera: '🇺🇸', grupo: 'Grupo D', total: 20, iso: 'us' },
    { nombre: 'Paraguay', codigo: 'PAR', bandera: '🇵🇾', grupo: 'Grupo D', total: 20, iso: 'py' },
    { nombre: 'Australia', codigo: 'AUS', bandera: '🇦🇺', grupo: 'Grupo D', total: 20, iso: 'au' },
    { nombre: 'Turquía', codigo: 'TUR', bandera: '🇹🇷', grupo: 'Grupo D', total: 20, iso: 'tr' },
    ],
  'Grupo E': [
    { nombre: 'Alemania', codigo: 'GER', bandera: '🇩🇪', grupo: 'Grupo E', total: 20, iso: 'de' },
    { nombre: 'Curazao', codigo: 'CUW', bandera: '🇨🇼', grupo: 'Grupo E', total: 20, iso: 'cw' },
    { nombre: 'Costa de Marfil', codigo: 'CIV', bandera: '🇨🇮', grupo: 'Grupo E', total: 20, iso: 'ci' },
    { nombre: 'Ecuador', codigo: 'ECU', bandera: '🇪🇨', grupo: 'Grupo E', total: 20, iso: 'ec' },
    ],
  'Grupo F': [
    { nombre: 'Países Bajos', codigo: 'NED', bandera: '🇳🇱', grupo: 'Grupo F', total: 20, iso: 'nl' },
    { nombre: 'Japón', codigo: 'JPN', bandera: '🇯🇵', grupo: 'Grupo F', total: 20, iso: 'jp' },
    { nombre: 'Suecia', codigo: 'SWE', bandera: '🇸🇪', grupo: 'Grupo F', total: 20, iso: 'se' },
    { nombre: 'Túnez', codigo: 'TUN', bandera: '🇹🇳', grupo: 'Grupo F', total: 20, iso: 'tn' },
    ],
  'Grupo G': [
    { nombre: 'Bélgica', codigo: 'BEL', bandera: '🇧🇪', grupo: 'Grupo G', total: 20, iso: 'be' },
    { nombre: 'Egipto', codigo: 'EGY', bandera: '🇪🇬', grupo: 'Grupo G', total: 20, iso: 'eg' },
    { nombre: 'Irán', codigo: 'IRN', bandera: '🇮🇷', grupo: 'Grupo G', total: 20, iso: 'ir' },
    { nombre: 'Nueva Zelanda', codigo: 'NZL', bandera: '🇳🇿', grupo: 'Grupo G', total: 20, iso: 'nz' },
    ],
  'Grupo H': [
    { nombre: 'España', codigo: 'ESP', bandera: '🇪🇸', grupo: 'Grupo H', total: 20, iso: 'es' },
    { nombre: 'Cabo Verde', codigo: 'CPV', bandera: '🇨🇻', grupo: 'Grupo H', total: 20, iso: 'cv' },
    { nombre: 'Arabia Saudita', codigo: 'KSA', bandera: '🇸🇦', grupo: 'Grupo H', total: 20, iso: 'sa' },
    { nombre: 'Uruguay', codigo: 'URU', bandera: '🇺🇾', grupo: 'Grupo H', total: 20, iso: 'uy' },
    ],
  'Grupo I': [
    { nombre: 'Francia', codigo: 'FRA', bandera: '🇫🇷', grupo: 'Grupo I', total: 20, iso: 'fr' },
    { nombre: 'Senegal', codigo: 'SEN', bandera: '🇸🇳', grupo: 'Grupo I', total: 20, iso: 'sn' },
    { nombre: 'Irak', codigo: 'IRQ', bandera: '🇮🇶', grupo: 'Grupo I', total: 20, iso: 'iq' },
    { nombre: 'Noruega', codigo: 'NOR', bandera: '🇳🇴', grupo: 'Grupo I', total: 20, iso: 'no' },
    ],
  'Grupo J': [
    { nombre: 'Argentina', codigo: 'ARG', bandera: '🇦🇷', grupo: 'Grupo J', total: 20, iso: 'ar' },
    { nombre: 'Argelia', codigo: 'ALG', bandera: '🇩🇿', grupo: 'Grupo J', total: 20, iso: 'dz' },
    { nombre: 'Austria', codigo: 'AUT', bandera: '🇦🇹', grupo: 'Grupo J', total: 20, iso: 'at' },
    { nombre: 'Jordania', codigo: 'JOR', bandera: '🇯🇴', grupo: 'Grupo J', total: 20, iso: 'jo' },
    ],
  'Grupo K': [
    { nombre: 'Portugal', codigo: 'POR', bandera: '🇵🇹', grupo: 'Grupo K', total: 20, iso: 'pt' },
    { nombre: 'Rep. del Congo', codigo: 'COD', bandera: '🇨🇩', grupo: 'Grupo K', total: 20, iso: 'cd' },
    { nombre: 'Uzbekistán', codigo: 'UZB', bandera: '🇺🇿', grupo: 'Grupo K', total: 20, iso: 'uz' },
    { nombre: 'Colombia', codigo: 'COL', bandera: '🇨🇴', grupo: 'Grupo K', total: 20, iso: 'co' },
    ],
  'Grupo L': [
    { nombre: 'Inglaterra', codigo: 'ENG', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', grupo: 'Grupo L', total: 20, iso: 'gb-eng' },
    { nombre: 'Croacia', codigo: 'CRO', bandera: '🇭🇷', grupo: 'Grupo L', total: 20, iso: 'hr' },
    { nombre: 'Ghana', codigo: 'GHA', bandera: '🇬🇭', grupo: 'Grupo L', total: 20, iso: 'gh' },
    { nombre: 'Panamá', codigo: 'PAN', bandera: '🇵🇦', grupo: 'Grupo L', total: 20, iso: 'pa' },
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