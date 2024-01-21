import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Customer } from '../entities/Customer';
import formatCPF from '../helpers/formatters/cpfFormatter';
import formatPhoneNumber from '../helpers/formatters/phoneFormatter';
import validateBirthdate from '../helpers/validations/birthdateValidation'
import validatePhoneNumber from '../helpers/validations/phoneValidation';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button';
const page = () => {
    const initialStateCustomer = { id: 0, nome: '', cpf: '', telefone: '', data_nascimento: '', ativo: true, created_at: '', updated_at: '' };
    const [clientes, setClientes] = useState<Customer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCliente, setCurrentCliente] = useState<Customer>(initialStateCustomer);
    const [errors, setErrors] = useState({});
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchClientes();
    }, [])

    const fetchClientes = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/getAllCustomers');
            setClientes(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCliente(id: number) {

        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteCustomer/${id}`);

            if (response.status !== 200) {
                throw new Error('Erro ao excluir o cliente');
            }
            setSuccessMessage('Cliente deletado Com sucesso!')
            setClientes(clientes.filter(cliente => cliente.id !== id));

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const handleEdit = (cliente: Customer) => {
        setCurrentCliente(cliente);
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setCurrentCliente(initialStateCustomer);
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (currentCliente.id === 0) {
            // Insert new customer

            if (!validateBirthdate(currentCliente.data_nascimento)) {
                setErrors({ birthdate: 'A data de nascimento não pode ser futura.' });
                setIsErrorModalOpen(true);
                return;
            }

            if (!validatePhoneNumber(currentCliente.telefone)) {
                setErrors({ phoneNumber: 'O número de telefone deve ser numérico e ter 11 dígitos.' });
                setIsErrorModalOpen(true);
                return;
            }

            try {
                const response = await axios.post('http://localhost:8000/api/createCustomer', currentCliente);
                if (response.status === 200) {
                    setClientes([...clientes, response.data.cliente]);
                    setIsModalOpen(false);
                    setSuccessMessage('Cliente criado com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 5000); // Message disappears after 5 seconds
                } else {
                    setErrors(response.data.errors);
                    setIsErrorModalOpen(true);
                }

            } catch (error) {
                const axiosError = error as AxiosError;
                setErrors(axiosError.response.data.errors);
                setIsErrorModalOpen(true);
            }
        } else {

            if (!validateBirthdate(currentCliente.data_nascimento)) {
                setErrors({ birthdate: 'A data de nascimento não pode ser futura.' });
                setIsErrorModalOpen(true);
                return;
            }

            if (!validatePhoneNumber(currentCliente.telefone)) {
                setErrors({ phoneNumber: 'O número de telefone deve ser numérico e ter 11 dígitos.' });
                setIsErrorModalOpen(true);
                return;
            }

            try {
                const response = await axios.put(`http://localhost:8000/api/updateCustomer/${currentCliente.id}`, currentCliente);
                if (response.status === 200) {
                    const updatedClientes = clientes.map(cliente => cliente.id === currentCliente.id ? response.data.cliente : cliente);
                    setClientes(updatedClientes);
                    setIsModalOpen(false);
                    setSuccessMessage('Cliente atualizado com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 5000); // Message disappears after 5 seconds
                } else {
                    setErrors(response.data.errors);
                    setIsErrorModalOpen(true);
                }
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError && axiosError.response) {
                    setErrors(axiosError.response.data.errors);
                    setIsErrorModalOpen(true);
                }
            }
        }
    };

    return (
        <div>
            {successMessage && (
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-2" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                        <div>
                            {successMessage}
                        </div>
                    </div>
                </div>
            )}

            <div className='text-center text-blue-500v mt-5'>
                <h1 className="text-2xl font-bold mb-5">Clientes</h1>
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5"
                onClick={handleNew}
            >
                Inserir novo cliente
            </button>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {clientes.map((cliente, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatCPF(cliente.cpf)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatPhoneNumber(cliente.telefone)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                                    <Button color="blue" hoverColor="blue" text="Editar" icon={faEdit} onClick={() => handleEdit(cliente)} />
                                   
                                    <Button color="red" hoverColor="red" text="Deletar" icon={faTrash} onClick={() => deleteCliente(cliente.id)} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Cliente</h3>
                                <div className="mt-2">
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                                        <input
                                            type="text"
                                            value={currentCliente.nome}
                                            onChange={(e) => setCurrentCliente({ ...currentCliente, nome: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                        <label className="block text-sm font-medium text-gray-700">CPF *(somente numeros) </label>
                                        <input
                                            type="text"
                                            value={formatCPF(currentCliente.cpf)}
                                            onChange={(e) => setCurrentCliente({ ...currentCliente, cpf: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                        <input
                                            type="text"
                                            value={formatPhoneNumber(currentCliente.telefone)}
                                            onChange={(e) => setCurrentCliente({ ...currentCliente, telefone: e.target.value })}
                                            onInput={(e) => {
                                                const val = e.currentTarget.value.replace(/\D/g, '');
                                            }}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                        <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                                        <input
                                            type="date"
                                            value={currentCliente.data_nascimento}
                                            onChange={(e) => setCurrentCliente({ ...currentCliente, data_nascimento: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleSubmit} >
                                    Salvar
                                </button>
                                <button

                                    type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalOpen(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isErrorModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Erros</h3>
                                <div className="mt-2">
                                    {Object.entries(errors).map(([key, value]) => (
                                        <p className="text-sm text-red-500" key={key}>{key}: {value}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsErrorModalOpen(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
export default page;
