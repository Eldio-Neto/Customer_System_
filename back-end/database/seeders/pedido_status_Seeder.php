<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class pedido_status_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $descriptions = ['Solicitado', 'Concluído', 'Cancelado'];

        foreach ($descriptions as $description) {
            \App\Models\Pedido_status::factory()->create(['descricao' => $description]);
        }
    }
}
