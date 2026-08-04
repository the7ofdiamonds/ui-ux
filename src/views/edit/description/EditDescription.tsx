import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from '../Edit.module.scss';

interface EditDescriptionProps {
    description: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    saveDescription: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditDescription: React.FC<EditDescriptionProps> = ({ description, handleChange, saveDescription }) => {
    return (
        <form className={styles.form} action="" id="edit_description">
            <div className={styles['form-item-flex']}>
                <label className={styles.label} htmlFor="description">Description:</label>
                <input
                    className={styles.input}
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description ?? ''}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.button} onClick={saveDescription}>
                <h3 className="title">save description</h3>
            </button>
        </form>
    )
}