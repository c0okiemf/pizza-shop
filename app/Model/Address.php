<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Address
 *
 * @property int $id
 * @property int $zip
 * @property string $street_address
 * @property int|null $apartment
 * @property int|null $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address whereApartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address whereStreetAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Address whereZip($value)
 * @mixin \Eloquent
 */
class Address extends Model
{
    public $timestamps = false;
}
