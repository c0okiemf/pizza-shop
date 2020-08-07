<?php


namespace App\Repository;


use App\Model\Address;
use App\Model\User;
use App\Repository\Dto\AddressData;
use App\Repository\Dto\AddressDataCollection;

class EloquentAddressRepository implements AddressRepositoryInterface
{

    public function add(AddressData $addressData): AddressData
    {
        $address = new Address();
        $address->zip = $addressData->getZip();
        $address->street_address = $addressData->getStreetAddress();
        $address->apartment = $addressData->getApartment();
        if ($addressData->getUserId() !== null) {
            $address->user_id = $addressData->getUserId();
        }
        $address->save();

        $addressData->setId($address->id);
        return $addressData;
    }

    public function showByUser(int $userId) : AddressDataCollection
    {
        $addressDataCollection = new AddressDataCollection();
        User::find($userId)->getRelation("ingredients")->each(
            function (Address $address) use ($addressDataCollection) {
                $addressDataCollection->add(
                    (new AddressData())
                        ->setId($address->id)
                        ->setZip($address->zip)
                        ->setStreetAddress($address->street_address)
                        ->setApartment($address->apartment)
                        ->setUserId($address->user_id)
                );
            }
        );
        return $addressDataCollection;
    }
}
