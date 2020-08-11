<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Order
 *
 * @property int $id
 * @property int|null $user_id
 * @property int $address_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order whereAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order whereUserId($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Pizza[] $pizzas
 * @property-read int|null $pizzas_count
 * @property-read \App\Model\Address $address
 * @property int $cart_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order whereCartId($value)
 * @property-read \App\Model\Cart $cart
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Order whereUpdatedAt($value)
 */
class Order extends Model
{
    public function cart()
    {
        return $this->belongsTo(
            Cart::class,
            "cart_id",
            "id"
        );
    }

    public function address()
    {
        return $this->belongsTo(
            Address::class,
            "address_id",
            "id"
        );
    }
}
