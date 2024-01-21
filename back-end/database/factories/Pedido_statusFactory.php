<?php

namespace Database\Factories;
use App\Models\Pedido_status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pedido_status>
 */
class Pedido_statusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Pedido_status::class;
    
    public function definition(): array
    {
        return [
            'descricao' => $this->faker->word,
        ];
    }
}
