<?php

namespace App\Http\Requests;

use App\Currency\CurrencyEnum;
use Illuminate\Foundation\Http\FormRequest;

class PlaceOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "pizzas" => "required|array",
            "pizzas.*.id" => "required|exists:App\Model\Pizza,id",
            "pizzas.*.quantity" => "required|numeric",
            "address_id" => "nullable|exists:App\Model\Address,id",
            "address" => "required_if:address_id,null|array",
            "address.zip" => "required_if:address_id,null|min:1|numeric",
            "address.street_address" => "required_if:address_id,null|min:1|max:255",
            "address.apartment" => "required_if:address_id,null|numeric",
            "currency" => [
                "required",
                function ($attribute, $value, $fail) {
                    if (!in_array($value, CurrencyEnum::toArray())) {
                        $fail($attribute." is invalid.");
                    }
                }
            ]
        ];
    }
}
