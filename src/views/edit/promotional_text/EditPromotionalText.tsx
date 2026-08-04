import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from '../Edit.module.scss';

interface EditPromotionalTextProps {
    promotionalText: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    saveTitle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditPromotionalText: React.FC<EditPromotionalTextProps> = ({ promotionalText, handleChange, saveTitle }) => {
    return (
        <form className={styles.form} action="" id="edit_promotionalText">
            <div className={styles['form-item-flex']}>
                <label className={styles.label} htmlFor="promotional_text">Promotional Text:</label>
                <input
                    className={styles.input}
                    type="text"
                    name="promotional_text"
                    placeholder="Promotional Text"
                    value={promotionalText ?? ''}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.button} onClick={saveTitle}>
                <h3 className="title">save promotional text</h3>
            </button>
        </form>
    )
}