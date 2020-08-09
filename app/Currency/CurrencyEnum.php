<?php


namespace App\Currency;


use MyCLabs\Enum\Enum;

/**
 * @method static self USD()
 * @method static self EUR()
 */
class CurrencyEnum extends Enum
{
    private const USD = 'usd';
    private const EUR = 'eur';
}
