<?php


namespace App\Http\Clients;


use Illuminate\Support\Facades\Http;

class ExchangeRatesApiUsdToEurClient implements UsdToEurClient
{

    public function getRate(): float
    {
        $response = Http::get("https://api.exchangeratesapi.io/latest", [
            'base' => 'USD'
        ]);
        return $response->json()["rates"]["EUR"];
    }
}
