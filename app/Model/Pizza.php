<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Pizza
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza whereName($value)
 * @mixin \Eloquent
 * @property int $price_usd
 * @property string $image_name
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Ingredient[] $ingredients
 * @property-read int|null $ingredients_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza whereImageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Pizza wherePriceUsd($value)
 */
class Pizza extends Model
{
    public $timestamps = false;

    public function ingredients()
    {
        return $this->belongsToMany(
            Ingredient::class,
            "pizzas_ingredients",
            "pizza_id",
            "ingredient_id"
        );
    }

    public function getFullImagePath()
    {
        return config("app.image_dir") . "/pizzas/" . $this->image_name;
    }
}
