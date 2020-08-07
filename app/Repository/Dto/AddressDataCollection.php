<?php


namespace App\Repository\Dto;


use Closure;

class AddressDataCollection
{
    private array $addressDataObjects;

    public function add(AddressData $addressData) : void
    {
        $this->addressDataObjects[] = $addressData;
    }

    public function toArray(): array
    {
        return (isset($this->addressDataObjects))
            ? array_map(function (AddressData $addressData) {
                return [
                    "id" => $addressData->getId(),
                    "zip" => $addressData->getZip(),
                    "streetAddress" => $addressData->getStreetAddress(),
                    "apartment" => $addressData->getApartment()
                ];
            }, $this->addressDataObjects)
            : [];
    }

    public function each(Closure $callback) : void
    {
        foreach ($this->addressDataObjects as $i => $addressData) {
            $callback($addressData, $i);
        }
    }
}
