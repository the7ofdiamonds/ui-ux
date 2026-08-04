import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from '../Edit.module.scss';

interface EditNameProps {
    name: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    saveName: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditName: React.FC<EditNameProps> = ({ name, handleChange, saveName }) => {
    return (
        <form className={styles.form} action="" id="edit_name">
            <div className={styles['form-item-flex']}>
                <label className={styles.label} htmlFor="name">Name:</label>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name ?? ''}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.button} onClick={saveName}>
                <h3 className="title">save name</h3>
            </button>
        </form>
    )
}