import React, { useState } from 'react'

function InputBox({Label, amount, currencyOption = [], selectCurrency = "inr", onAmountChange, onCurrencyChange}) {
    return (
        <div className='rounded-lg text-sm p-3 flex w-80 bg-white'>
            <div className='w-1/2'>
                <label className='mb-2 inline-block px-0.5 text-black'>{Label}</label>
                <input type='number' placeholder='AMOUNT' value={amount} onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} className='rounded-lg bg-gray-100 cursor-pointer outline-none w-32 py-1.5' />
            </div>
            <div className='text-right text-black justify-end flex flex-wrap'>
                <label className='mb-2 w-full'>CURRENCY TYPE</label>
                <select
                    className="rounded-lg text-gray-500 bg-gray-100 cursor-pointer outline-none px-1 py-1" value={selectCurrency} onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    {currencyOption.map((currency) => (<option key={currency} value={currency}>{currency}</option>))}
                </select>
                
            </div>
        </div>
    )
}

export default InputBox;
