import React from 'react'

import './Switcher.css'

export const Switcher = ({ checked, onChange, disabled, children }) => {
    return (
        <label className="switcher_wrapper">
            {children}
            <span
                className={`switcher ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
            >
                <span className="dot" />
            </span>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                    if (!disabled) {
                        onChange(e.target.checked)
                    }
                }}
                disabled={disabled}
                className="hidden"
            />
        </label>
    )
}
