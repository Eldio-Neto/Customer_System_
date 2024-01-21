import axios, { AxiosError } from 'axios';
import { useEffect, useState } from "react";
import Order from "../entities/Orders";
import OrderStatus from "../entities/OrderStatus";
import { Customer } from "../entities/Customer";
import { NumericFormat } from 'react-number-format';
import formatDate from '../helpers/formatters/dateFormatter';
import { faEdit, faTrash, faFileCsv } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button';

const Page = () => {
    const initialStateOrder: Order = {
        id: 0, cliente_id: -1, produto: '', created_at: '', updated_at: '', data_pedido: '', pedido_status_id: 0, valor: 0,
        cliente: {
            id: 0, nome: '', data_nascimento: '', telefone: '', cpf: '', ativo: true, created_at: '', updated_at: ''
        },
        imagem: {
            id: 0, pedido_id: 0, imagem: '', capa: ''
        },
    }
    const [orders, setOrders] = useState<Order[]>([]);
    const [clientes, setClientes] = useState<Customer[]>([]);
    const [status, setStatus] = useState<OrderStatus[]>([]);
    const [errors, setErrors] = useState({});
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<Order>(initialStateOrder);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [image, setImage] = useState<File>();

    useEffect(() => {
        fetchAllOrders();
        fetchClientes();
        fetchStatus();
    }, []);

    async function fetchAllOrders() {
        try {
            const { data } = await axios.get('http://127.0.0.1:8000/api/getAllOrders');
            setOrders(data.pedidos);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchClientes = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/getAllCustomers');
            setClientes(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStatus = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/getAllOrderStatus');
            setStatus(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (order: Order) => {
        setEditingOrder(order);
        setIsModalOpen(true);
    }

    // const handleSubmit = async () => {
    //     if (editingOrder.id === 0) {
    //         editingOrder.valor = parseFloat(editingOrder.valor.toString().replace('R$', '').replace(',', '.'));
    //         try {
    //             const { data } = await axios.post('http://localhost:8000/api/createOrder', editingOrder);
    //             setOrders([...orders, data.pedido]);
    //             setIsModalOpen(false);
    //             setSuccessMessage('Pedido criado com sucesso!');
    //             setTimeout(() => setSuccessMessage(''), 5000); // Message disappears after 5 seconds
    //         } catch (error) {
    //             const axiosError = error as AxiosError;
    //             setErrors(axiosError.response.data.errors);
    //             setIsErrorModalOpen(true);
    //         }
    //     } else {
    //         try {
    //             editingOrder.valor = parseFloat(editingOrder.valor.toString().replace('R$', '').replace(',', '.'));
    //             const { data } = await axios.put(`http://localhost:8000/api/updateOrder/${editingOrder.id}`, editingOrder);
    //             const newOrders = orders.map(order => order.id === data.id ? data.pedido : order);
    //             setOrders(newOrders);
    //             setIsModalOpen(false);
    //             setSuccessMessage('Pedido criado com sucesso!');
    //             setTimeout(() => setSuccessMessage(''), 5000);
    //         } catch (error) {
    //             const axiosError = error as AxiosError;
    //             setErrors(axiosError.response.data.errors);
    //             setIsErrorModalOpen(true)
    //         }
    //     }
    // }

    const handleSubmit = async () => {
        if (editingOrder.id === 0) {
            editingOrder.valor = parseFloat(editingOrder.valor.toString().replace('R$', '').replace(',', '.'));

            // Criar um objeto FormData
            const formData = new FormData();
            Object.keys(editingOrder).forEach(key => {
                formData.append(key, editingOrder[key]);
            });

            // Adicionar a imagem ao objeto FormData se ela existir
            if (image) {
                formData.append('imagem', image);
            }

            try {
                const { data } = await axios.post('http://localhost:8000/api/createOrder', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setOrders([...orders, data.pedido]);
                setIsModalOpen(false);
                setSuccessMessage('Pedido criado com sucesso!');
                setTimeout(() => setSuccessMessage(''), 5000); // Message disappears after 5 seconds
            } catch (error) {
                const axiosError = error as AxiosError;
                setErrors(axiosError.response.data.errors);
                setIsErrorModalOpen(true);
            }
        } else {
            editingOrder.valor = parseFloat(editingOrder.valor.toString().replace('R$', '').replace(',', '.'));
            if (image) {
                // Criar um objeto FormData
                const formData = new FormData();
                Object.keys(editingOrder).forEach(key => {
                    formData.append(key, editingOrder[key]);
                });

                // Adicionar a imagem ao objeto FormData se ela existir
                formData.append('imagem', image);

                try {
                    const { data } = await axios.post(`http://localhost:8000/api/updateOrder/${editingOrder.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    const newOrders = orders.map(order => order.id === data.id ? data.pedido : order);
                    setOrders(newOrders);
                    setIsModalOpen(false);
                    setSuccessMessage('Pedido criado com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 5000);
                } catch (error) {
                    const axiosError = error as AxiosError;
                    setErrors(axiosError.response.data.errors);
                    setIsErrorModalOpen(true)
                }
            } else {
                try {
                    editingOrder.valor = parseFloat(editingOrder.valor.toString().replace('R$', '').replace(',', '.'));
                    const { data } = await axios.put(`http://localhost:8000/api/updateOrder/${editingOrder.id}`, editingOrder);
                    const newOrders = orders.map(order => order.id === data.id ? data.pedido : order);
                    setOrders(newOrders);
                    setIsModalOpen(false);
                    setSuccessMessage('Pedido criado com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 5000);
                } catch (error) {
                    const axiosError = error as AxiosError;
                    setErrors(axiosError.response.data.errors);
                    setIsErrorModalOpen(true)
                }
            }
        }
    }

    const deleteOrder = (id: number) => {
        axios.delete(`http://localhost:8000/api/deleteOrder/${id}`).then(() => {
            const newOrders = orders.filter(order => order.id !== id);
            setOrders(newOrders);
        });
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            // Faça algo com a imagem, por exemplo, salvar em um estado
            setImage(img);
        }
    };

    const getCsv = () => {
        axios.get(`http://localhost:8000/api/getOrderCsv/`).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pedido.csv');
            document.body.appendChild(link);
            link.click();
        });
    }

    const handleNew = () => {
        setEditingOrder(initialStateOrder);
        setIsModalOpen(true);
    }

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
                <h1 className="text-2xl font-bold mb-5">Pedidos</h1>
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5"
                onClick={handleNew}>
                Inserir novo Pedido
            </button>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">data_pedido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{order.produto}</td>
                                <td className="px-6 py-4 whitespace-nowrap">R$ {order.valor}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(order.data_pedido)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button color="blue" hoverColor="blue" text="Editar" icon={faEdit} onClick={() => handleEdit(order)} />
                                    <Button color="red" hoverColor="red" text="Deletar" icon={faTrash} onClick={() => deleteOrder(order.id)} />
                                    <Button color="green" hoverColor="green" text="Csv" icon={faFileCsv} onClick={() => getCsv()} />
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
                                        <label className="block text-sm font-medium text-gray-700">Produto</label>
                                        <input
                                            type="text"
                                            value={editingOrder.produto}
                                            onChange={(e) => setEditingOrder({ ...editingOrder, produto: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                        <label className="block text-sm font-medium text-gray-700">Valor </label>
                                        <NumericFormat
                                            value={editingOrder.valor}
                                            onValueChange={(values) => {
                                                const { formattedValue, value } = values;
                                                setEditingOrder({ ...editingOrder, valor: formattedValue });
                                            }}
                                            thousandSeparator={false}
                                            prefix="R$"
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            allowNegative={false}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                        <label className="block text-sm font-medium text-gray-700">Data do Pedido</label>
                                        <input
                                            type="date"
                                            value={editingOrder.data_pedido}
                                            onChange={(e) => setEditingOrder({ ...editingOrder, data_pedido: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                                        <label className="block text-sm font-medium text-gray-700">Clientes</label>

                                        <div className="inline-block relative w-64">
                                            <select value={editingOrder.cliente_id}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, cliente_id: parseInt(e.target.value) })}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                                <option value="-1">Selecione</option>
                                                {clientes.map((cliente, index) => {
                                                    return (
                                                        <option key={index} value={cliente.id}>{cliente.nome}</option>
                                                    );
                                                })}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>

                                        <label className="block text-sm font-medium text-gray-700">Status</label>

                                        <div className="inline-block relative w-64">
                                            <select value={editingOrder.pedido_status_id}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, pedido_status_id: parseInt(e.target.value) })}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                                <option value="-1">Selecione</option>
                                                {status.map((status, index) => {
                                                    return (
                                                        <option key={index} value={status.id}>{status.descricao}</option>
                                                    );
                                                })}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>

                                        <label htmlFor="imagem">Imagem do Pedido:</label>
                                        <input type="file" id="imagem" name="imagem" onChange={handleImageChange} />
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
};
export default Page;