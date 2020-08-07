<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
            'pizzas_ids' => 'required|array',
            'pizzas_ids.*' => 'required|exists:App\Model\Pizza,id',
            'address_id' => 'nullable|exists:App\Model\Address,id',
            'address' => 'required_if:address_id,null|array',
            'address.zip' => 'required_if:address_id,null|numeric',
            'address.street_address' => 'required_if:address_id,null|max:255',
            'address.apartment' => 'required_if:address_id,null|numeric',
        ];
    }
}
