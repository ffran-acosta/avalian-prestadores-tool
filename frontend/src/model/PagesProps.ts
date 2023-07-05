import { Prestador, Year } from ".";

export interface PrestadorPage{
    prestador: Prestador
}

export interface YearPage {
    years: Year[]
}

export interface ModalPage {
    prestador?: Prestador;
    onClose: () => void;
}
