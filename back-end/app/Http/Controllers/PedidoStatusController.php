<?php

namespace App\Http\Controllers;
use App\Models\Pedido_status;
use Illuminate\Http\Request;

class PedidoStatusController extends Controller
{
    //
     public function getAllOrderStatus(){
        return Pedido_status::all();
     }
}
