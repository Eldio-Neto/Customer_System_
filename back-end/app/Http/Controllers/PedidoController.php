<?php

namespace App\Http\Controllers;

use Intervention\Image\Facades\Image;

use App\Models\Pedido;
use App\Models\Pedido_image;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function create(Request $request)
    {

        $validatedData = $request->validate([
            'produto' => 'required|string',
            'valor' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'data_pedido' => 'required|date',
            'cliente_id' => 'required|exists:clientes,id',
            'pedido_status_id' => 'required|exists:pedido_statuses,id',
        ]);

        $pedido = Pedido::create($validatedData);
        $pedido->load('cliente:id,nome');

        if ($request->hasFile('imagem')) {
            $imagem = $request->file('imagem');
            $this->store($imagem,  $pedido);
        }

        return response()->json(['success' => 'Pedido criado com sucesso', 'pedido' => $pedido])->setStatusCode(201);
    }

    public function getAllOrders()
    {

        $pedidos = Pedido::with('cliente:id,nome')->get();
        // Retornar uma resposta
        return response()->json(['success' => 'Pedidos recuperados com sucesso', 'pedidos' => $pedidos]);
    }

    public function update(Request $request, Pedido $pedido)
    {
        $validatedData = $request->validate([
            'produto' => 'required|string',
            'valor' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'data_pedido' => 'required|date',
            'cliente_id' => 'required|exists:clientes,id',
            'pedido_status_id' => 'required|exists:pedido_statuses,id',
        ]);

        $pedido->update($validatedData);

        return response()
            ->json([
                'message' => 'Pedido atualizado com sucesso!',
                'pedido' => $pedido, 'status' => 200
            ])
            ->setStatusCode(200);
    }

    public function delete(Pedido $pedido)
    {

        $pedido->delete();
        return response()->json(['mensagem' => 'Pedido deletado com Sucesso'])->setStatusCode(200);
    }

    public function exportCsv()
    {
        $pedidos = Pedido::with('cliente:id,nome')->get();

        $headers = array(
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=pedidos.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        );

        $callback = function () use ($pedidos) {
            $file = fopen('php://output', 'w');
            fputcsv($file, array('Produto', 'Valor', 'Data do Pedido', 'ID do Cliente', 'Nome do Cliente', 'ID do Status do Pedido'), ";");

            foreach ($pedidos as $pedido) {
                fputcsv($file, array($pedido->produto, $pedido->valor, $pedido->data_pedido, $pedido->cliente_id, $pedido->cliente->nome, $pedido->pedido_status_id), ";");
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }


    public function storeImage($imagem)
    {
        // Nome da imagem
        $nomeImagem = time() . '.' . $imagem->getClientOriginalExtension();

        // Mover a imagem para o diretório de imagens
        $imagem->move(public_path('imagens'), $nomeImagem);

        return 'imagens/' . $nomeImagem;
    }

    public function store($imagem, $pedido)
    {
        // Salvar a imagem e obter o caminho
        $caminhoImagem = $this->storeImage($imagem);

        // Salvar o caminho da imagem no banco de dados
        $pedidoImagem = new Pedido_image();
        $pedidoImagem->pedido_id = $pedido->id;
        $pedidoImagem->imagem = $caminhoImagem;
        $pedidoImagem->capa = 'imagens/redimensionadas/' . $caminhoImagem;
        $pedidoImagem->save();
    }
}
