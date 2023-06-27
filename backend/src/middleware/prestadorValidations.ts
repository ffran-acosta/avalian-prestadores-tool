import { Prestador } from "../models";

export const validatePrestador = (prestador: Prestador): string[] => {
    const errors: string[] = [];

    // Validación de ID del prestador
    if (!prestador.id || !/^\d{6}$/.test(String(prestador.id))) {
        errors.push('ID must be a 6-digit number');
    }

    // Validación del nombre del prestador
    if (!prestador.prestador) {
        errors.push('Prestador name is required');
    }

    // Validación de userID
    if (prestador.userId <= 0) {
        errors.push('UserID must be greater than 0');
    }

    // Validación de years vacío
    if (!prestador.years || prestador.years.length === 0) {
        const currentYear = new Date().getFullYear();
        prestador.years = [
            {
                year: currentYear,
                meses: [
                    { mes: 'ENE', valor: 0 },
                    { mes: 'FEB', valor: 0 },
                    { mes: 'MAR', valor: 0 },
                    { mes: 'ABR', valor: 0 },
                    { mes: 'MAY', valor: 0 },
                    { mes: 'JUN', valor: 0 },
                    { mes: 'JUL', valor: 0 },
                    { mes: 'AGO', valor: 0 },
                    { mes: 'SEP', valor: 0 },
                    { mes: 'OCT', valor: 0 },
                    { mes: 'NOV', valor: 0 },
                    { mes: 'DIC', valor: 0 },
                ],
            },
        ];
    }

    return errors;
};