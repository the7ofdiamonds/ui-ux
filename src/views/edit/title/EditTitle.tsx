import React, { useEffect, useState, ChangeEvent } from 'react';

import styles from '../Edit.module.scss';

interface EditTitleProps {
    title: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    saveTitle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditTitle: React.FC<EditTitleProps> = ({ title, handleChange, saveTitle }) => {
    return (
        <form className={styles.form} action="" id="edit_title">
            <div className={styles['form-item-flex']}>
                <label className={styles.label} htmlFor="title">Title:</label>
                <input
                    className={styles.input}
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title ?? ''}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.button} onClick={saveTitle}>
                <h3 className="title">save title</h3>
            </button>
        </form>
    )
}