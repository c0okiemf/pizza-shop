<?php


namespace App\Currency;


use App\Http\Clients\CachedClient;
use App\Http\Clients\ExchangeRatesApiUsdToEurClient;

class Converter
{
    public static function convert(float $amount, float $rate)
    {
        return round($amount * $rate * 2) / 2;
    }

    public static function calculateCostInCurrency(float $cost, CurrencyEnum $currencyEnum) : float
    {
        switch ($currencyEnum) {
            case CurrencyEnum::EUR():
                return Converter::convert(
                    $cost,
                    (new CachedClient(new ExchangeRatesApiUsdToEurClient()))->getRate()
                );
            default:
                return $cost;
        }
    }
}
