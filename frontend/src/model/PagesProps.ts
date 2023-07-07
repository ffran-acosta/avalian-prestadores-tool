import { Prestador, Year } from ".";

export interface PrestadorPage{
    prestador: Prestador
}

export interface YearPage {
    prestador?: Prestador;
    years: Year[]
}

export interface ModalPage {
    prestador?: Prestador;
    onClose: () => void;
}
