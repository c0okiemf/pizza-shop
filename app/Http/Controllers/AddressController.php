<?php

namespace App\Http\Controllers;

use App\Repository\EloquentAddressRepository;
use Auth;

class AddressController extends Controller
{
    public function showUserAddresses(EloquentAddressRepository $addressRepository)
    {
        return response()->json([
            'success' => true,
            'items' =>  $addressRepository->showByUser(
                Auth::id()
            )->toArray()
        ]);
    }
}
