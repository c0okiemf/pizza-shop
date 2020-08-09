<?php


namespace App\Http\Clients;


use Cache;
use DateInterval;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;

class CachedClient
{
    protected UsdToEurClient $client;

    public function __construct(UsdToEurClient $client)
    {
        $this->client = $client;
    }

    public function getRate()
    {
        return Cache::remember(
            "usd_eur_rate",
            new DateInterval("P1D"),
            function () {
                return $this->client->getRate();
            }
        );
    }
}
