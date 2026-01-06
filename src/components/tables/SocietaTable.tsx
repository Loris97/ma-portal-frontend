import { Societa } from '../../types/api.types';
import { Link } from 'react-router-dom';

// Props interface
interface SocietaTableProps {
    societa: Societa[];
    isLoading: boolean;
    error: string;
}

export default function SocietaTable({ societa, isLoading, error }: SocietaTableProps) {

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📊 Società in Portfolio
            </h2>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Caricamento società...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-medium">Errore:</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Tabella*/}
            {!isLoading && !error && societa.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">

                            {/* Header */}
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fatturato
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        EBITDA
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Regione
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Settore
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Azioni
                                    </th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody className="divide-y divide-gray-200">
                                {societa.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">

                                        {/* Nome */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {s.nome}
                                            </div>
                                        </td>

                                        {/* Fatturato */}
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            €{s.fatturato.toLocaleString('it-IT')}
                                        </td>

                                        {/* EBITDA */}
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            €{s.ebitda?.toLocaleString('it-IT') || 'N/A'}
                                            {/* Nota: ebitda può essere null/undefined */}
                                        </td>

                                        {/* Regione */}
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {s.regione}
                                        </td>

                                        {/* Settore */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                                {s.settore}
                                            </span>
                                        </td>

                                        {/* Azioni */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={`/societa/${s.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors inline-flex items-center gap-1"
                                            >
                                                Dettaglio →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && societa.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg">📭 Nessuna società trovata</p>
                </div>
            )}
        </div>
    );
}
