<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Cart
 *
 * @property int $id
 * @property float $delivery_cost
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Pizza[] $pizzas
 * @property-read int|null $pizzas_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Cart newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Cart newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Cart query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Cart whereDeliveryCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Cart whereId($value)
 * @mixin \Eloquent
 * @property string $currency_code
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Cart whereCurrencyCode($value)
 */
class Cart extends Model
{
    public $timestamps = false;

    public function pizzas()
    {
        return $this->belongsToMany(
            Pizza::class,
            "carts_pizzas",
            "cart_id",
            "pizza_id"
        );
    }
}
