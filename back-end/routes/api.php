<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController as Clientes;
use App\Http\Controllers\PedidoController as Pedidos;
use App\Http\Controllers\PedidoStatusController as PedidoStatus;
use Illuminate\Routing\Router;

Route::get('/getAllCustomers', [Clientes::class, 'getAllCustomers']);
Route::post('/createCustomer', [Clientes::class, 'create']);
Route::put('/updateCustomer/{cliente}', [Clientes::class, 'update']);
Route::delete('/deleteCustomer/{cliente}', [Clientes::class, 'delete']);

Route::get('/getAllOrders', [Pedidos::class, 'getAllOrders']);
Route::post('/createOrder', [Pedidos::class, 'create']);
Route::put('/updateOrder/{pedido}', [Pedidos::class, 'update']);
Route::post('/updateOrder/{pedido}', [Pedidos::class, 'update']);
Route::delete('/deleteOrder/{pedido}', [Pedidos::class, 'delete']);
Route::get('/getOrderCsv', [Pedidos::class, 'exportCsv']);

Route::get('/getAllOrderStatus', [PedidoStatus::class, 'getAllOrderStatus']);



