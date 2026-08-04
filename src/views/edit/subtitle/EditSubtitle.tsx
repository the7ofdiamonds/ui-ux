import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from '../Edit.module.scss';

interface EditTitleProps {
    subtitle: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    saveSubtitle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditSubtitle: React.FC<EditTitleProps> = ({ subtitle, handleChange, saveSubtitle }) => {
    return (
        <form className={styles.form} action="" id="edit_subtitle">
            <div className={styles['form-item-flex']}>
                <label className={styles.label} htmlFor="subtitle">Subtitle:</label>
                <input
                    className={styles.input}
                    type="text"
                    name="subtitle"
                    placeholder="Subtitle"
                    value={subtitle ?? ''}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.button} onClick={saveSubtitle}>
                <h3 className="title">save subtitle</h3>
            </button>
        </form>
    )
}