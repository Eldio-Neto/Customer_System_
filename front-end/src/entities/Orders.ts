import { Customer } from "./Customer";

type Order = {
    id: number;
    produto: string;
    valor: number;
    data_pedido: string;
    cliente_id: number;
    pedido_status_id: number;
    created_at: string;
    updated_at: string;
    cliente: Customer;
    pedido_image: OrderImage;
}

export default Order;

