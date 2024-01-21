<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Cliente::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome' => $this->faker->name,
            'cpf' => $this->faker->unique()->numerify('###.###.###-##'), // Gera um CPF fictício
            'data_nascimento' => $this->faker->date('Y-m-d'), // Gera uma data aleatória
            'telefone' => $this->faker->phoneNumber, // Gera um número de telefone aleatório
            //'ativo' => $this->faker->boolean, // Gera um valor booleano aleatório (0 ou 1)
        ];
    }
}