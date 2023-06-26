export interface Prestador {
    id: number;
    userId: number;
    prestador: string;
    localidad: string;
    tipo: string;
    notas: string[];
    years: Year[];
}

export interface Year {
    year: number;
    meses: Mes[];
}

export interface Mes {
    mes: string;
    valor: number;
}

