<?php


namespace App\Http\Clients;


interface UsdToEurClient
{
    public function getRate() : float;
}
