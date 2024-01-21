<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto',
        'valor',
        'data_pedido',
        'cliente_id',
        'pedido_status_id',
       
    ];

    public function cliente()
    {
        return $this->belongsTo('App\Models\Cliente');
    }

    public function pedido_image()
    {
        return $this->hasOne(Pedido_image::class);
    }
}
