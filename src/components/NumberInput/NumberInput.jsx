import React from 'react'

const Input = ({ value, min, max, onChange }, ref) => {
    return (
        <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(event) => {
                let { value, min, max } = event.target

                const val = Math.max(
                    Number(min),
                    Math.min(Number(max), Number(value))
                )

                onChange(val)
            }}
            className="input"
            ref={ref}
        />
    )
}

export const NumberInput = React.forwardRef(Input)
