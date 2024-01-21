<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;


class ClienteController extends Controller
{
    public function cliente()
    {
        return $this->belongsTo('App\Models\Cliente');
    }
    
    public function getAllCustomers(Request $request)
    {
        $customers = \App\Models\Cliente::all();

        return response()->json($customers);
    }

    public function create(Request $request)
    {

        // Validar os dados do pedido
        $validatedData = $request->validate([
            'nome' => 'required|max:255',
            'cpf' => 'required|max:14',
            'data_nascimento' => 'required|date',
            'telefone' => 'nullable|max:15',
            'ativo' => 'nullable|integer',
        ]);

        // Criar um novo cliente com os dados validados
        $cliente = Cliente::create($validatedData);

        // Retornar uma resposta
        return ['success' => 'Cliente criado com sucesso', 'cliente' => $cliente];
    }

    public function update(Request $request, Cliente $cliente)
    {

        $validatedData = $request->validate([
            'nome' => 'required|max:255',
            'cpf' => 'required|max:14',
            'data_nascimento' => 'required|date',
            'telefone' => 'nullable|max:15',
            'ativo' => 'nullable|integer',
        ]);

        $cliente->update($validatedData);

        return response()
            ->json([
                'message' => 'Cliente atualizado com sucesso!',
                'cliente' => $cliente, 'status' => 200
            ])
            ->setStatusCode(200);
    }

    public function delete($id)
    {
        // Obter o cliente pelo ID
        $cliente = Cliente::find($id);

        // Verificar se o cliente existe
        if (!$cliente) {
            return response()->json(['error' => 'Cliente não encontrado'])->setStatusCode(404);
        }

        // Excluir o cliente
        $cliente->delete();

        // Retornar uma resposta
        return response()->json(['mensagem' => 'Cliente deletado com Sucesso'])->setStatusCode(200);
    }
}
