<?php

namespace App\Http\Controllers;

use App\Http\Clients\ExchangeRatesApiUsdToEurClient;
use App\Repository\Dto\PizzaData;
use App\Repository\EloquentPizzaRepository;
use Illuminate\Http\Client\Request;

class PizzaController extends Controller
{
    public function all(EloquentPizzaRepository $pizzaRepository)
    {
        $collection = $pizzaRepository->all();
        $pricesUsd = $collection->pluckPriceUsd();
        $pricesEur = $this->fetchEurPrices($pricesUsd);
        $collection->each(function (PizzaData $pizzaData, int $i) use ($pricesEur) {
            $pizzaData->setPriceEur($pricesEur[$i]);
        });

        return response()->json([
            'success' => true,
            'items' => $collection->toArray()
        ]);
    }

    /**
     * @param float[] $usdPrices
     * @return array
     */
    protected function fetchEurPrices(array $usdPrices)
    {
        $client = new ExchangeRatesApiUsdToEurClient();
        $rate = $client->getRate();
        return array_map(function (float $priceUsd) use ($rate) {
            $converted = $priceUsd * $rate;
            return round($converted * 2) / 2;
        }, $usdPrices);
    }
}
