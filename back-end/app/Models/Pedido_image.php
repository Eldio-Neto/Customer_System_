<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido_image extends Model
{
    use HasFactory;

    protected $fillable = ['pedido_id', 'imagem', 'capa'];

    public function pedido_image()
    {
        return $this->hasOne(Pedido_image::class);
    }
}
