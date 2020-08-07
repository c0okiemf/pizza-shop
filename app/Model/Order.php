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
 */
class Order extends Model
{
    //
}
